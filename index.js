const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const route = require("./routes/productRoutes");
const cors = require("cors");

app.use(express.json());

app.use(express.json());

// Enable CORS with specific options to allow requests from 'http://127.0.0.1:5500'
const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

mongoose
  .connect(
    "mongodb+srv://sauravmahajan2007:VtQrNsNLrQPgIreS@cluster0.fno6qas.mongodb.net/mydatabase",
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB Is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(PORT, () => {
  console.log("Express app running on Port", PORT);
});

//VtQrNsNLrQPgIreS
