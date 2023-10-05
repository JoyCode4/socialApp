const express = require("express");
const app = express();
const PORT = 8000;

app.get("/",(req,res)=>{
    res.send("Hello, world!");
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error",err);
    }
    console.log("Server is running on port "+PORT);

})