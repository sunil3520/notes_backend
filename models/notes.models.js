const mongoose=require("mongoose");

//user shcema
const notesSchema=mongoose.Schema(
    {
        title:String,
        body:String,
        sub:String,
        userId:String
       
    },
    {
        versionKey:false
    }
)

const NoteModel=mongoose.model("note",notesSchema)

module.exports={NoteModel};