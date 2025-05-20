import { Router } from "express"
import { database } from "./db.js"

const dadosUsuario = [
    "name","email","password"
] 
const returnUsuario = [
    "id","name","email"
]
export const userRoutes = Router()

userRoutes.get("",(req,res)=>{

    const users = database.users
    const returnusers = users.map((user)=>{
        const obj = {}
        for(const key in user){
            console.log("body",key,user[key])
            if(returnUsuario.includes(key)){
                obj[key] = user[key]
            }
        }
        user = obj
        console.log(obj,"obj",user)
        return obj
    })
    return res.status(200).json(returnusers)
})

userRoutes.get("/:id",(req,res)=>{
    const findUser = database.users.find((user)=>user.id === req.params.id)
    if(!findUser){
        return res.status(200).json(findUser)
    }
    return res.status(200).json(findUser)
})
userRoutes.post("",(req,res)=>{
    const infos = Object.keys(req.body)
    console.log(infos,"infos")
    if(infos.length < dadosUsuario.length){
        return res.status(403).
        json({message:`Dados inválidos, os dados que devem ser enviados são:
             ${dadosUsuario.map((dado)=>dado)}`})
    }
    const obj = {}
    for(const key in req.body){
        console.log("body",key,req.body[key])
        if(dadosUsuario.includes(key)){
            obj[key] = req.body[key]
        }
    }

        console.log(obj,"ok")

    const user = obj
    user.id = String(new Date().getTime())
 
    database.users.push(user)
    return res.status(201).json(user)
})

userRoutes.put("/:id", (req, res) => {
    const index = database.users.findIndex(user => user.id === req.params.id);
    if(index === -1) return res.status(404).json({ error: "Usuário não existe" });
    
    const usuarioAtualizado = {};
    for(const dados of dadosUsuario) {
        if(!req.body[dados]) {
            return res.status(400).json({ error: `Faltando dados: ${dados}`});
        }
        usuarioAtualizado[dados] = req.body[dados];
    }
        usuarioAtualizado.id = req.params.id;
        database.users[index] = usuarioAtualizado;
        return res.json(usuarioAtualizado);
    })

    userRoutes.delete("/:d", (req, res) => {
        const index = database.users.findIndex(user => user.id === req.params.id);
        if(index === -1) return res.status(404).json({error: "Usuário não existe"});

        database.users.splice(index, 1);
        return res.status(204).send()
    })

    userRoutes.patch("/:id",(req, res)=>{
        const findIndex = database.users.findIndex((user)=>user.id === req.params.id)
        if(findIndex === -1){
            return res.status(404).json({message:"Usuário não encontrado"})
        }
        const oldUser = database.users[findIndex]
        const obj = {}
        for(const key in req.body){
            if(dadosUsuario.includes(key)){
                obj[key] = req.body[key]
            }
        }
        const updateUser = {
            ...oldUser,
            ...obj,
        }
        database.users[findIndex] = updateUser
        return res.status(200).json(updateUser)
    })