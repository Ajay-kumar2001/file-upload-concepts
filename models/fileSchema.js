const mongoose= require("mongoose")
var fileSchema = new mongoose.Schema({

    filename:{type:String ,required:true},
    updatedFiles:[String],
    version:[String]

});
module.exports = mongoose.model('file',fileSchema);