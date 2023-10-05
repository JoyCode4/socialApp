const express = require("express");
const app = express();
const PORT = 8000;

// use express routers
app.use("/",require("./routes"));

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error",err);
    }
    console.log("Server is running on port "+PORT);

})