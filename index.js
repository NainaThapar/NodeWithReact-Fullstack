const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./server/routes/authRoutes");
const keys = require("./server/config/keys");
require("./server/models/User");
require("./server/services/passport");

mongoose.connect(keys.mongoUri);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./server/routes/authRoutes")(app);

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// }); //route handler

const PORT = process.env.PORT || 5000; //to read port from heroku(underlying deployment)
app.listen(PORT);
