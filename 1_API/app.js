const express = require("express");
const app = express();

//Middle ware

//Routes

app.get("/", (req,res) => {
    res.send("Hello World")
});

app.get("/posts", (req, res) => {
    res.send("Posts")
});

app.listen(3000);