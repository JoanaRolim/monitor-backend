const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Não foi possível conectar ao MongoDB:", error);
  }
};

module.exports = connectDB;
