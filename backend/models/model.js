import mongoose from "mongoose";

const model3DSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A model must have a name'],
        trim: true,
        maxlength: [100, 'Model name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'A model must have a description'],
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    file: {
        type: String,
        required: [true, 'A model must have a file URL']
    },
    cloudinaryPublicId: {  // Made optional in schema
        type: String,
        index: true
    }
}, {
    timestamps: true
});

const Model3D = mongoose.model("Model3D", model3DSchema);

export default Model3D;