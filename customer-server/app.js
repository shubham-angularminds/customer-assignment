const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"));

mongoose.connection.on("error", (err) => {
  console.log("DB Connection error: ${err.message}");
});

//Router
const Routes = require("./routes/customer");

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/api", Routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`A Node JS API is listening on port: ${port}`);
});
