const express=require("express");
const path=require("path");
const app=express();
const hbs=require("hbs");
const twilio = require('twilio');
const http = require('http').createServer(app)
// const fast2sms=require("fast-two-sms");
require("./db/conn");
// require("./db/donn");

require('dotenv').config();

const Register=require("./models/registers");
// const Donor=require("./models/donors");

const port=process.env.PORT || 3000;

const static_path= path.join(__dirname, "../public");
const templates_path= path.join(__dirname, "../templates/views");
const partials_path= path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine","hbs"); //use hbs 
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
});
 
app.get("/register",(req,res)=>{
    res.render("register");
});

app.get("/donate",(req,res)=>{
    res.render("donate");
});

app.get("/donor",(req,res)=>{
    res.render("donor");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/locate",(req,res)=>{
    res.render("locate");
});

app.get("/logged",(req,res)=>{
    res.render("logged");
});

app.get("/aboutus",(req,res)=>{
    res.render("aboutus");
});

app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.get("/chat",(req,res)=>{
    res.render("chat");
});


app.get("/",async(req,res)=>{
    try{
        console.log("logout successful")
    }catch(eror){
        res.status(500).send(error);
    }
})

const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

app.post("/register",async(req,res)=>{
    try{
        const createpassword=req.body.cpassword;
        const repassword=req.body.rpassword;

        if(createpassword === repassword){
            const registerDonor=new  Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                dob:req.body.dob,
                number:req.body.number,
                cpassword:req.body.cpassword,
                rpassword:req.body.rpassword,
            })

            const registered=await registerDonor.save();
            res.status(201).render("login");
        }else{
            res.send("Passwords not matching");
        }
    }catch(error){
        res.status(400).send(error);
    }
});

app.post("/login",async(req,res)=>{
    try
    {
        const email=req.body.email;
        const password=req.body.password;
        
        const useremail = await Register.findOne({email:email}); //check if email matches
        
        if(useremail.cpassword === password)//if password in db = to pass entered
        {
            res.status(201).render("logged");
        }else{ 
            res.send("Invalid login credentials"); //if password is invalid
        }
    }catch(error){
        res.status(400).send("Invalid login credentials"); //if email is invalid
    }
})



app.listen(port,()=>{
    console.log(`Server is successfully running at port ${port}`);
})