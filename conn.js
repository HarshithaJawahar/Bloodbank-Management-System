const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/registeration",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`Connection succesful`);
}).catch((e)=>{
    console.log(`No connection`);
})