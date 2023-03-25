const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });

    const Game = mongoose.model("game",schema);
    return Game;
  };