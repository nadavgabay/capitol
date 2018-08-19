const express = require('express');
const path = require('path');
const request = require("request")

const app = express();
const port = process.env.PORT || 5000;

// API calls
app.get('/api/getFinancialUnits', (req, res) => {
  res.send(require("./server/db/financial_units.json"));
});

app.get('/api/getPositions', (req, res) => {
  res.send(require("./server/db/positions.json"));
});

app.get('/api/getCCyCurrency/:ccy', (req, rs) => {
  var url = `https://www.amdoren.com/api/currency.php?api_key=GD2xyNkcpYGW4DjyuaM6ruEgwgu4Pq&from=${req.params.ccy}&to=USD`

  return rs.send({amount: 1.32324});
  // return request({
  //   url: url,
  //   json: true
  // }, function (error, response, body) {
  //   if (!error && response.statusCode === 200) {
  //       rs.send(body);
  //   } else { // HOOK - NOT SUPPOSE TO BE HERE IF THE LP IS CORRECT
  //       rs.send({amount: 1.32324});
  //   }
  // })
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
