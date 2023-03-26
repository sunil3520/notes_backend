const mongoose=require("mongoose");

//user shcema
const userSchema=mongoose.Schema(
    {
        email:{
            type: String,
        trim: true,
        lowercase: true,
        unique: true,
        },
        pass:String,
        location:String,
        age:Number  
    },
    {
        versionKey:false
    }
)

const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel};