const mongoose=require("mongoose");

mongoose.set('strictQuery', false);
mongoose
.connect("mongodb://0.0.0.0:27017/newRegister")
.then(()=>console.log("Database connection succesfull"))
.catch((e)=>console.log("no connection in Database"))



