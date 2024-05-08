const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors')
const app = express();
const port = 5555;
const usermodel = require('./model/usermodel')
app.use(cors());
app.use(express.json());

//MONGODB CONNECTING
mongoose.connect('mongodb+srv://muhammadsulaimant367:sRoEDatvJY9hXWiz@cluster0.g9par5e.mongodb.net/users')
.then(()=>{
    console.log('mongodb connected with express');
}).catch((err)=>{
    console.log('mongodb connction err');
})

//SHOW DATA OR GETING WITHOUT ID
app.get('/getserver',async(req,res)=>{
    try{
        const user = await usermodel.find();
        console.log(user);
        res.send(user);
       }catch(err){
           console.log('err',err);
       }
})
//SHOW DATA OR GETTING USING ID
app.get('/getserver/:id', async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.id); // Use findById instead of find
        console.log('success');
        res.send(user);
    } catch (err) {
        console.log('err', err);
    }
})

//POSTING OR PUSHING VALUES
app.post('/postserver', async (req, res) => {
    const { name, place, email, password,id} = req.body;
    const user  = new usermodel({ name, place, email, password,id });
    try {
        
        await user.save();
        console.log(user);
        res.send({ message: 'User created successfully', user }); 
    } catch (err) {
        console.log('err', err);
    }
});
//UPDATING
app.put('/updateserver/:id', async (req, res) => {
    try {
        const user = await usermodel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.send(user);
        console.log('success');
    } catch (error) {
        console.log('err its not currently working :',error);
        
    }
    })
    //DELETE
app.delete('/deleteserver/:id', async (req,res)=>{
    try {
        const user = await usermodel.findOneAndDelete(req.params.id)
        if (!user) return res.status(404).send({ message: 'user not found' });
        res.send('successfuly deleted ');
        console.log('finished');
        
    } catch (error) {
        console.log('err its not currently working :',error);

        
    }
})
//PORT RUNNING
app.listen(port,()=>{
    console.log('server is running',port);
})