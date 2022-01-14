const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '2mb' }))


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});