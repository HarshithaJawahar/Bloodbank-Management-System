const mongoose=require("mongoose");
const registererSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true,
        unique:true
    },
    number:{
        type:Number,
        required:true,
        unique:true,
    },
    cpassword:{
        type:String,
        required:true
    },
    rpassword:{
        type:String,
        required:true
    },

})

const Register = new mongoose.model("Register",registererSchema);
module.exports=Register;