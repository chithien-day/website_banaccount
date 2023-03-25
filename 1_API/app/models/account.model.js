const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id_gametype: String,
        description: String,
        game_picture: String,
        gameusername: String,
        gamepass: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const {__v, _id, ...object} = this.toObject();
      object.id = _id;
      return object;
    });

    const Account = mongoose.model("account",schema);
    return Account;
  };