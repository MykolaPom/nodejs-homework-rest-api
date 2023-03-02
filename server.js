const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const connection = mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(`Connection error ${err.message}`);
    process.exit(1);
  });