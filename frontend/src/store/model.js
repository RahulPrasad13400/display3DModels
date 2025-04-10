import { create } from 'zustand'

export const useModelStore = create((set)=>({
    models : [],
    setModels : (models) => set({models}),
    createModel : async (model) => {
        console.log(model)
        if(!model.name || !model.description || !model.file){
            return { success : false, message : "please fill out all the fields"}
        }

        const formData = new FormData();
        formData.append('name', model.name);
        formData.append('description', model.description);
        formData.append('file', model.file);  // Assuming model.file is a File object

        console.log("formData : ",formData)

        const res = await fetch(`http://localhost:2000/api/models`, {
            method: "POST",
            body: formData
            // Don't set Content-Type header - the browser will set it automatically with the boundary
        });


        const data = await res.json()
        if (!res.ok) {
            return { success: false, message: data.message || "Upload failed" };
        }
        set(state=>({models : [...state.models, data.data]}))
        return { success: true, message: "Model created successfully" };
    }
}))

