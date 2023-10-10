const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const cors = require("cors");

// to enable cross origin communication
app.use(cors());
// to read the bod from client
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);

module.exports = app;
