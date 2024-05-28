const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://gauravpadda:$PwdCluster0$06@cluster0.hb7ezaq.mongodb.net/TodoApp");

const userSchema=new mongoose.Schema({
    username:String,
    password:String,
})

const todoSchema= new mongoose.Schema({
    title:String,
    description:String,
    complete:Boolean,  
})

const user=mongoose.model("user",userSchema)
const todo=mongoose.model("todo",todoSchema)

module.exports={
    todo,
    user
}