//create express server
const express=require("express");
const app=express();
const jwt=require("jsonwebtoken")
app.use(express.json());

const { userSignup, userSignin, createTodo, updateTodo } = require("./types");
const { todo, user } = require("./db");
const jwtPassword = "gauravpadda"
const usermiddleware = require("./middleware");



app.post("/signup",async(req,res)=>{

    const signupPayloads=req.body;
    const parsePayloads=userSignup.safeParse(signupPayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            msg:"invalid inputs"
        })
    }
    //creating user in mongodb
    
    await user.create({
        username:signupPayloads.username,
        password:signupPayloads.password
    })
    res.send("new user create")


})

app.post("/signin",async(req,res)=>{
    const signinPayloads=req.body;
    const parsePayloads=userSignin.safeParse(signinPayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            msg:"invalid inputs"
        })
    }
    const data=await user.findOne({
        username:signinPayloads.username,
        password:signinPayloads.password
    })
    if(data){
        //authentication
    const token=jwt.sign({username:data.username},jwtPassword);
    res.json({
        token:token
    })  
    }else{
        res.status(403).send("no user found")
    }
    

})
app.post("/todo",usermiddleware,async (req,res)=>{
    const createPayloads=req.body;

    const parsePayloads=createTodo.safeParse(createPayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            msg:"invalid inputs",
        })
    }

    await todo.create({
        title:createPayloads.title,
        description:createPayloads.description,
        complete:false
    })
    res.send("new todo created");
    

})
app.get("/todo",usermiddleware,async(req,res)=>{
    const token=req.headers.authorization;
    const data=await todo.find({});
    res.json({
        todo:data
    })



})
app.put("/completed",usermiddleware,async(req,res)=>{
    const token=req.headers.authorization;
    const updatePayloads=req.body;
    const parsePayloads=updateTodo.safeParse(updatePayloads);
    if(!parsePayloads.success){
        res.status(411).json({
            msg:"invalid inputs"
        })
    }
    //update todo based on id 
    await todo.updateOne({_id:updatePayloads.id},{
        
        complete:true
    })
    res.send("todo has been updated")

})
app.listen(3000);