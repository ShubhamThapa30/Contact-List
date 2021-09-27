const express = require("express");
const path = require('path');

require("../src/db/conn");

const ContactList = require("../src/models/contacts");

const router = path.join( __dirname,'../src/routers/contact');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const static_path = path.join(__dirname,"../public");

app.use(express.static(static_path));

app.post("/contacts",async(req,res)=>{
    try{
        const addingContactsList = new ContactList(req.body)
        const insertContacts = await addingContactsList.save();
        res.status(201).send(insertContacts);
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/contacts",async(req,res)=>{
    try{
       const getContacts = await ContactList.find({});
        res.send(getContacts);
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/contacts/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
       const getContact = await ContactList.findById({_id});
        res.send(getContact);
    }catch(e){
        res.status(400).send(e);
    }
})

app.patch("/contacts/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
       const getContact = await ContactList.findByIdAndUpdate(_id,req.body,{
           new:true
       });
        res.send(getContact);
    }catch(e){
        res.status(500).send(e);
    }
})

app.delete("/contacts/:id",async(req,res)=>{
    try{
       const getContact = await ContactList.findByIdAndDelete(req.params.id);
        res.send(getContact);
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port, ()=> {
    console.log('connection is live ');
})