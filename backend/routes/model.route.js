import express from "express";
import { createModel, getAllModels, getModel, deleteModel } from "../controllers/model.controller.js";
import multer from "multer";

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Temporary storage before uploading to Cloudinary
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

// Create upload middleware
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // Limit file size to 50MB (adjust as needed)
    }
});

const router = express.Router();

router.get('/', getAllModels);
router.get('/:id', getModel);
router.post('/', upload.single('file'), createModel); // Add multer middleware here
router.delete('/:id', deleteModel);

export default router;