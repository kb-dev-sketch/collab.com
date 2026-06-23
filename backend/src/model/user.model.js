import mongoose from"mongoose"

const userSchema=new mongoose.Schema({
    
    username:{
        type:String,
         required:true,
         lowercase:true,
         trim:true,
         index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        enum:["brand","creator"],
        reuired:true,
    },
},
{timestamps:true}
)
export const User=mongoose.model("User",userSchema)