const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
}); //route handler

const PORT = process.env.PORT || 5000; //to read port from heroku(underlying deployment)
app.listen(PORT);
