import uploadFile from "../config/upload";

const uploadImage = (req,res)=>{
    uploadFile.single('file');
};

export default uploadImage
