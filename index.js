const express = require("express");
require("./server/services/passport");
require("./server/routes/authRoutes");

const app = express();

require("./server/routes/authRoutes")(app);

// app.get("/", (req, res) => {
//   res.send({ hi: "there" });
// }); //route handler

const PORT = process.env.PORT || 5000; //to read port from heroku(underlying deployment)
app.listen(PORT);
