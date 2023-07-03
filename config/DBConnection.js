const mongoose= require("mongoose")
const dbConnection=()=>{
mongoose.connect(process.env.DB_URL).then(()=>console.log("db connected")).catch(()=>console.log("db not connected"))
}
module.exports=dbConnection