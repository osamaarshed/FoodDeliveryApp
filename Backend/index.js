// const http = require("http");
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/login/test", (req, res) => {
  res.send("akjasdnasdnksja");
});

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
