const Comment = require("../models/comment");

module.exports.create = async (req,res)=>{
    console.log(req.body,req.user._id);
    
}