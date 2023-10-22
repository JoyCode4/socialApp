const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
// session cookies encryption and the passport auth
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const CMiddleware = require("./config/middleware");
const kue = require("kue");

// setting up the socket
const chatServer = require("http").createServer(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css",
  })
);

app.use(express.urlencoded());
// app.use(express.json());
app.use(cookieParser());

app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);
// extract styles and js files from sub-pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the ejs and views route
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "socialapp",
    secret: process.env.sessionSecret,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60, //1 hour max age of cookie expire
    },
    store: MongoStore.create({
      mongoUrl: process.env.MongoUrl.toString(),
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(CMiddleware.setFlash);

// use express routers
app.use("/", require("./routes"));

//used this to see the kue job working
// kue.app.listen(3001);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error", err);
  }
  console.log("Server is running on port " + PORT);
});
