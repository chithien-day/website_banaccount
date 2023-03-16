const express = require("express");
const app = express();
const cors = require("cors");

//Middle ware
var corsOptions = {
    origin: "{http://localhost:8081}"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//Routes

app.get("/", (req,res) => {
    res.json({message: "Hello World"});
});


// app.listen(3000);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
});