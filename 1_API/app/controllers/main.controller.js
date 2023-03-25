// const db = require("../models");
// const datas = db.main;

// exports.create = (req, res) => {
//     // Validate request
//     if (!req.body.title) {
//       res.status(400).send({ message: "Content can not be empty!" });
//       return;
//     }
  
//     // Create a new game 
//     const dbac = new data({
//       idgame: req.body.idgame,
//       name: req.body.name,
//     });
  
//     // Save game in the database
//     datas
//       .save(datas)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Tutorial."
//         });
//       });

      
//   };