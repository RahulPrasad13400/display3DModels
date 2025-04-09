import express from "express"
import { createModel, getAllModels, getModel } from "../controllers/model.controller.js"
import { deleteModel } from "mongoose"
const router = express.Router()

router.get('/', getAllModels)
router.get('/:id', getModel)
router.post('/', createModel)
router.delete('/:id', deleteModel)

export default router 