//for zod file to validate the inputs
const z=require("zod")

const userSignup=z.object({
    username: z.string().email(),
    password:z.string().min(8),
    confirmPassword:z.string().min(8)

})
const userSignin=z.object({
    username: z.string().email(),
    password:z.string().min(8),
    

})
const createTodo=z.object({
    title:z.string(),
    description:z.string(),
})

const updateTodo=z.object({
    id:z.string(),
})
module.exports={
    userSignup:userSignup,
    userSignin:userSignin,
    createTodo:createTodo,
    updateTodo:updateTodo
}

