const { request } = require("express");
const express = require("express");
const app = express();
const port = 5000;

app.get("/calculator", (req, res) => {
  const money = Number(req.query.money);
  const months = Number(req.query.months);
  // Simulated lag to show spinner
  setTimeout(() => {
    res.send(String(money / months));
  }, 500);
});

app.listen(port, () => {});
