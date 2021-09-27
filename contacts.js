const express = require("express");
const  mongoose  = require("mongoose");
const nodemon = require("nodemon");

const contactsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    phone_no:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },

})

const ContactList = new mongoose.model("ContactList",contactsSchema)

module.exports = ContactList;