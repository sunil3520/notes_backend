const express=require("express");
require("dotenv").config()
const app=express();
const {connection}=require("./db");
const {userRouter}=require("./routes/user.routes");
const {notesRoutes}=require("./routes/notes.routes");
const {auth}=require("./middlewares/auth.middlewares")
const cors=require("cors");
app.use(express.json());
app.use(cors()) 


app.use("/user",userRouter)
app.use(auth)
app.use("/notes",notesRoutes);

  








app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Mongo is connected");

    }catch(err){
      console.log("Mongo is not connected");
    }
    console.log(`Server is running on ${process.env.PORT}`);
})