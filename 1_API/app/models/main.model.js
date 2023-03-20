module.exports = mongoose => {
    const Main = mongoose.model(
      "main",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Main;
  };