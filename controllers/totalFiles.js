let files=require("../models/fileSchema")
let totalfiles=async(req,res)=>{
    try{
     const totalFiles=await files.find()
     totalfiles?res.status(200).json({"status":"ok","data":totalFiles}):res.status(400).json({"status":"failed","message":"requested files or not available"})


    }catch(error){
        res.status(500).json({"status":"failed","message":error})
    }

}
module.exports=totalfiles