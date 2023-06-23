import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import dotenv from 'dotenv'
const app=express();

app.use(bodyParser.json({limit: "30mb", extended:"true"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:"true"}));
app.use(cors());
dotenv.config();
app.use('/posts',postRoutes)

app.use('/user',userRoutes)

const PORT=process.env.PORT || 5000;


mongoose.connect(process.env.DATABASE,{useNewUrlParser: "true",useUnifiedTopology:"true"})
.then(()=>{
return( app.listen(PORT,()=>(console.log(`server running on ${PORT}`))))
})
.catch((error)=>console.log(error))
mongoose.set('bufferCommands', false)