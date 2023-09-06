const mongoose=require("mongoose");
const Schema=mongoose.Schema;
 const questionSchema=new mongoose.Schema({
question :{
    type :String,
    required:true,
},
option:[],
category:{
    type:String,
}

 });
 module.exports=mongoose.model("Question",questionSchema);