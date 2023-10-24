const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

//configurações
const router = require('express').Router();
const app = express();
app.use(bodyParser.json());

//conexção com o banco
mongoose.connect("mongodb://127.0.0.1:27017/rev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
})

//model
const UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true}
})
const User = mongoose.model('User', UserSchema);

//rota de teste
app.post("/cadastro", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(name == null || email == null || password == null){
        return res.status(400).json({error:"Preencha todos os campos"});
    }
    const user = new User({
        name: name,
        email: email,
        password: password
    })
    try{
    const newUser = await user.save();
    res.json({error: null, msg:"Cadastro concluído", userId: newUser._id})
    }
    catch(error){
        res.status.json({error});
    }
})

//criando uma rota get
app.get("/",(req, res) =>{
    res.sendFile(__dirname + '/index.html');
})

//leitura da porta
app.listen(3000, ()=>{
    console.log("rodando na porta 3000")
})