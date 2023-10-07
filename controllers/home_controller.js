module.exports.home = (req,res)=>{
    // console.log(req.cookies); //getting cookie with name or key
    // res.cookie("user_id",55); //setting cookie
    return res.render("home",{
        title:"Social Media App"
    })
}