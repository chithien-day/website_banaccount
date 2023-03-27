const express = require("express");
const app = express();
const cors = require("cors");

var corsOptions = {
    origin: "{http://localhost:8081}"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const swagger = require("./swagger");

//connect to db
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// //Routes test port
// app.get("/", (req,res) => {
//     res.json({message: "Hello World"});
// });

//swagger(app);

//jwt
  async function initial() {
    const count = await Role.estimatedDocumentCount()
    if (count === 0) {
      await new Role({
        name: "user",
      }).save();

      await new Role({
        name:"moderator"
      }).save();

      await new Role({
        name:"admin"
      }).save();
  }
}
      
//main db
require("./app/routes/game.routes")(app);
require("./app/routes/account.routes")(app);

//jwt
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`);
});