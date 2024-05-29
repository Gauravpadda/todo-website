import { CreateTodo } from "./components/Component";
import { Todo } from "./components/TodoRendering";
import { useState } from "react";
async function App(){
  const [todo,setTodo]=useState([]);

  fetch("http://localhost:3000/todo",{
    method:'GET',
    headers: new Headers({
      Authorization:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdhdXJhdnBhZGRhQGdtYWlsLmNvbSIsImlhdCI6MTcxNjk4ODg3M30.28cgaaXofqOgETIBujcwlqNUQIpawX1YsK8PxCO6yH0'
    })
  })
  .then(async function(value){
    const json=await value.json();
    setTodo(json.todo);

  })
  
  return (
  <div> 
    <CreateTodo />
    <Todo todo={todo}></Todo>
  </div>
)
}
export default App