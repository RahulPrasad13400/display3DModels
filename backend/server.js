import express from "express";
import dotenv from "dotenv";
import modelRoutes from './routes/model.route.js';
import { connectDb } from "./lib/db.js";
import cors from "cors";
import multer from "multer"; // Import multer

const app = express();
dotenv.config();

// CORS configuration
app.use(cors());

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Temporary storage before uploading to Cloudinary
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});  

const upload = multer({ storage: storage });

// Middleware
app.use(express.json({ limit: "50mb" })); // For JSON data
// Note: Don't use express.urlencoded() when you're using multer for file uploads

// Routes
app.use('/api/models', modelRoutes); // Make sure your route handles upload.single('file')

app.listen(2000, () => {
    console.log("server is running");
    connectDb();
});