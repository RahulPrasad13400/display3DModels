import Model3D from "../models/model.js"
import { v2 as cloudinary } from "cloudinary"
import fs from 'fs';
import path from 'path';

export const getAllModels = async (req, res) => {
    try {
        const models = await Model3D.find()
        res.status(200).json({
            status : true,
            models
        })
    } catch (error) {
        console.log("Error occured in the getAllModels controller : ",error.message)
        res.status(500).json({
            message : "server error",
            error : error.message
        })
    }
}

export const getModel = async (req, res) => {
    const {id} = req.params
    try {
        const model = await Model3D.findById(id)
        if(!model){
            return res.status(400).json({
                status : false,
                message : "Model not found"
            })
        }
        res.status(200).json({
            status : true,
            model
        })
    } catch (error) {
        console.log("Error occured in the getModel controller : ",error.message)
        res.status(500).json({
            message : "server error",
            error : error.message
        })
    }
}

export const createModel = async (req, res) => {
    try {
        console.log(req.body)
        const { name, description } = req.body;
        const file = req.file;

        if (!name || !description || !file) {
            if (file) fs.unlinkSync(file.path);
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
            folder: "model3d",
            resource_type: "raw"
        });

        // Clean up temp file
        fs.unlinkSync(file.path);

        // Create model with Cloudinary response data
        const model = await Model3D.create({
            name,
            description,
            file: cloudinaryResponse.secure_url,
            cloudinaryPublicId: cloudinaryResponse.public_id  // Now properly set from Cloudinary
        });

        res.status(201).json({
            status: true,
            data: model
        });

    } catch (error) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
}

export const deleteModel = async (req, res) => {
    const { id } = req.params;  
    try {
        const model = await Model3D.findById(id);
        if(!model) {
            return res.status(404).json({  
                status: false,
                message: "Model not found"
            });
        }

        if(model.file) {
            const publicId = model.file.split('/').slice(-2).join('/').split('.')[0];
            try {
                await cloudinary.uploader.destroy(publicId);
                console.log("Deleted file from Cloudinary!");
            } catch (error) {
                console.log("Error deleting file from Cloudinary", error.message);
            }
        }

        await Model3D.findByIdAndDelete(id);

        res.status(200).json({
            status: true,  
            message: "Model deleted successfully!"
        });

    } catch (error) {
        console.log("Error in deleteModel controller:", error.message);
        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message
        });   
    }
}