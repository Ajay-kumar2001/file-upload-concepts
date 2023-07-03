const express =require ("express")
require("dotenv").config()
const cors=require("cors")
const bodyParser = require('body-parser')
const busboy=require("./middlewares/busboy")

let app =express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(busboy())

let router=require("./routes/routes")
const dbConnection = require("./config/DBConnection")
app.use("",router)
dbConnection()
app.listen(process.env.PORT,process.env.IP,()=>console.log("server is runing"))







