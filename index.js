const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const calculatePostage = require('./calculatePostage.js');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile(__dirname + '/public/form.html'))
  .get('/calculateResults', calculatePostage)
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

