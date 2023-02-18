

const mongoose = require('mongoose');
let port=process.env.PORT||8000

mongoose.connect('mongodb+srv://AMO_Library:AMO_Library@cluster0.0llzsci.mongodb.net/?retryWrites=true&w=majority').then(()=>{
console.log("Mongo start")
}).catch((e)=>{
    console.log(e);
})



const NotesSchema = new mongoose.Schema({
    title: String,
    des: String
});
const Notes = mongoose.model('Notes', NotesSchema);

const express = require("express");
const cors=require("cors")
const app=express()

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.post('/add', async(req, res) => {
    
    try {
        const data= await Notes.create({
            title: req.body.title,
            des: req.body.des
        })
        res.json(data)
    } catch (error) {
        
        
       res.json({"status":"Error"})
    }
        
})

app.get('/get', async(req, res) => {
    
    let data;
    try {
        data=await Notes.find({});
        res.json(data)
    } catch (error) {
        
       res.json({"status":"Error"})
    }   
})
app.get('/',(req,res)=>{
res.send("Om")
})
app.post('/update', async(req, res) => {
    
    let data;
    try {
        data=await Notes.findByIdAndUpdate({ _id: req.body.id },
            {
                title:req.body.title,
                des:req.body.des
            },
            {
                new: true
            }
        );
        res.json(data)
    } catch (error) {
        
        console.log(error)
       res.json({"status":"Error"})
    }   
})
app.delete('/delete', async(req, res) => {
    
    let data;
    try {
        data=await Notes.findByIdAndDelete({ _id: req.body.id });
        if(data==null){
        res.json({"status":"false"})
    }
    else{
        res.json({"status":"true"})
    }
        
    } catch (error) {
        
        console.log(error)
       res.json({"status":"false"})
    }   
})
app.listen(port, () => {
    console.log("starting...")
})