const mongoose =require('mongoose');
//schema 
const userSchema = new mongoose.Schema({
    name:String,
    place:String,
        // required:true
    
   email:String,
        // required:true
    
    password:String,
    id:String,
       
})
//model
const  usermodel = mongoose.model('users',userSchema);
module.exports = usermodel;