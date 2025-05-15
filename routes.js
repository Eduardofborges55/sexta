import { Router } from "express"
import { database } from "./db.js"
const dadosUsuario = [
    "name","email","password"
] 
export const userRoutes = Router()

userRoutes.get("",(req,res)=>{

    const users = database.users
    return res.status(200).json(users)
})
userRoutes.post("",(req,res)=>{
    const infos = Object.keys(req.body)
    console.log(infos,"infos")
    if(infos.length < dadosUsuario.length){
        return res.status(403).
        json({message:`Dados inválidos, os dados que devem ser enviados são:
             ${dadosUsuario.map((dado)=>dado)}`})
    }
    const obj = []
    for(const key in req.body){
        console.log("body",key,req.body(key))
        if(dadosUsuario.includes(key)){
            obj[key] = req.body(key)
        }
    }

        console.log(obj,"ok")

    const user = obj
    user.id = String(new Date().getTime())
 
    database.users.push(user)
    return res.status(201).json(user)
})
userRoutes.get("/:id",(req,res)=>{
    const findUser = database.users.find((user)=>user.id === req.params.id)
    if(!findUser){
        return res.status(200).json(findUser)
    }
})

// if( dadosUsuario != "name" && dadosUsuario != "email" && "password" ){
//     alert("tem que ter: nome, email e senha nada mais")
// } else {
//     alert(dadosUsuario)
// }