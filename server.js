const express = require("express");
const cors = require("cors");

const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/ssl', (req, res, next) => {
  res.send('Hello from SSL Server')
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/band.routes.js")(app);
// set port, listen for requests

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const sslServer = https.createServer(
  {
      key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)
sslServer.listen(3443, () => console.log('Secure server on port 3443'))
