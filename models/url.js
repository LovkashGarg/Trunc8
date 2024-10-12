const mongoose=require('mongoose');

const urlSchema=new mongoose.Schema({
    shortID:{
        type:String,
        required:true
    },
    Redirect_url:{
        type:String,
        required:true
    },
    // array of objects 
    visitHistory:[{timestamp:{type:Number}}]
},{timestamps:true});

const URL=mongoose.model('url',urlSchema);

module.exports=URL;

