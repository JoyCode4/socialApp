const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// session cookies encryption and the passport auth
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");


app.use(express.urlencoded());
app.use(cookieParser())

app.use(express.static("./assets"));


app.use(expressLayouts);
// extract styles and js files from sub-pages into the layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


// setting up the ejs and views route
app.set("view engine","ejs");
app.set("views","./views");

app.use(session({
    name:"socialapp",
    secret:"social",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*60), //1 hour max age of cookie expire
    }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express routers
app.use("/",require("./routes"));

app.listen(PORT,(err)=>{
    if(err){
        console.log("Error",err);
    }
    console.log("Server is running on port "+PORT);
    
})