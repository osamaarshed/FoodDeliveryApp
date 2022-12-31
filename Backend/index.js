// const http = require("http");
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/login/test", (req, res) => {
  res.send("akjasdnasdnksja");
});

app.post("/login", (req, res) => {
  // res.send(req.body);
  console.log(req.body);
  res.send("asd");
});

app.listen(8080, () => {
  console.log("The server is running on port 8080");
});
