const { request } = require('express')
const express = require('express')
const app = express()
const port = 5000

app.get('/calculator', (req, res) => {
  const number = Number(req.query.number)
  // Simulated lag to show spinner
  setTimeout(() => {res.send(String(2*number))},500)
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})