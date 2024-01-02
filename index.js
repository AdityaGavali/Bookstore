import express from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose";
// import {Book} from  "./models/bookModel.js"
import booksroute from "./routes/booksRoute.js"
import cors from 'cors';
const app = express();
app.use(express.json()); // to parse the request body 
app.get('/', (req,res)=>{
    console.log(req)
    return res.status(234).send("Hello dosto")

})
app.use(cors())
app.use('/books', booksroute) // middleware to handle routes 

// middleware to handle cors policy 
// option1 : allow all  : 

//option 2 : customize  : 
// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods : ['GET', 'PUT', 'POST', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database succesfully")
    app.listen(PORT, ()=>{
        console.log(`App is listening to  ${PORT}`); 
    })    

})
.catch((error)=>{
  console.log(error);
})
