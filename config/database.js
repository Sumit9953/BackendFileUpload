const mongoose = require("mongoose");

require("dotenv").config();

const databaseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB connected successfully"))
    .catch((error) => {
      console.log("DB connection issues");
      console.error(error);
      process.exit(1);
    });
};

module.exports = databaseConnect;
