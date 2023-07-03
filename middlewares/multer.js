const multer=require("multer")
const fs=require("fs")
const path=require("path")

const storage=multer.diskStorage({
    destination:(req,file,cd)=>{
        if (!fs.existsSync("C:/Ahex-tasks/file-versioning/uploads")){
            fs.mkdirSync("C:/Ahex-tasks/file-versioning/uploads")
        }
        cd(null,"C:/Ahex-tasks/file-versioning/uploads")
    },
    filename:(req,file,cd)=>{
        cd(null,file.originalname.split(".")[0]+"-"+Date.now()+"."+file.originalname.split(".")[1])
    }
    
})
const uplode=multer({storage:storage})
module.exports=uplode