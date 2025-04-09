import mongoose from "mongoose";

const model3DSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'A model must have a name']
    },
    description : {
        type : String,
        required : [true, 'A model must have a description']
    },
    file : {
        type : String,
        required : [true, 'A model must have a name']
    },
    cloudinaryPublicId: String
},{
    timeStamps : true
})

const Model3D = mongoose.model("Model3D", model3DSchema)
export default Model3D