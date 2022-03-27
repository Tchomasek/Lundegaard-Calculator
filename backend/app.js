const { request } = require("express");
const express = require("express");
const app = express();
const port = 5000;

app.get("/calculator", (req, res) => {
  const money = Number(req.query.money);
  const months = Number(req.query.months);
  const intrestRate = Number(req.query.interestRate);
  const interest = money * intrestRate;
  const totalAmount = money + interest;
  const monthlyPayment = totalAmount / months;
  // Simulated lag to show spinner
  setTimeout(() => {
    res.send({
      monthlyPayment: String(monthlyPayment),
      totalAmount: String(totalAmount),
    });
  }, 500);
});

app.listen(port, () => {});
