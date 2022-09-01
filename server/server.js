require("dotenv").config();

const express = require("express");
const app = express();

const userRoutes = require("./routes/Auth");
const postRoutes = require("./routes/Posts");
const connect = require("./db/conn");
const cors = require("cors");

app.use(express.json({ limit: "15mb" }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use("/api/post", postRoutes);
app.use("/api/auth", userRoutes);

(async () => connect(app))(); //IFFE
