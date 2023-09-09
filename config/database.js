const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.DB_URL).then((connect) => {
    console.log(`MongoDB connected :${connect.connection.host}`);
  });
};

module.exports = dbConnection;
