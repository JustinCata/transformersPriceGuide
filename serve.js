const express = require('express');
const requests = require('request');

const app = express();
const port = process.env.PORT || 80;
const path = require('path');
const fs = require('fs');

app.get('/', (request, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  // read in the index.html file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Transformers TCG Prices');
    data = data.replace(/\$OG_DESCRIPTION/g, 'The only guide to discover the price of your Transformers trading cards.');
    data = data.replace(/\$OG_URL/g, 'https://transformersprices.com/');
    result = data.replace(/\$OG_IMAGE/g, 'https://cdn-images-1.medium.com/max/1000/1*C6tMRj4ErUGk3vuISFDCaQ.png'); // need
    response.send(result);
  });
});



app.get('/search/:query', (request, response) => {
  // console.log('Terms page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const query = request.params.query;
    data = data.replace(/\$OG_TITLE/g, `Search results for ${query} | Transformers TCG Prices`);
    data = data.replace(/\$OG_DESCRIPTION/g, `Searching Transformers TCG Prices for ${query}`);
    data = data.replace(/\$OG_URL/g, `https://transformersprices/search/${query}`);
    result = data.replace(/\$OG_IMAGE/g, 'https://cdn-images-1.medium.com/max/1000/1*C6tMRj4ErUGk3vuISFDCaQ.png');
    response.send(result);
  });
});

app.get('/card/:card_id', (request, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const card_id = request.params.card_id;
    requests(`https://development.metamesh.io/api/v1/guest/post/${card_id}`, (error, respons, body) => {
      if (!error && respons.statusCode == 200) {
        const res = JSON.parse(body);
        // console.log(res);
        
        data = data.replace(/\$OG_TITLE/g, `${res.name} | Transformers TCG Prices`);
        data = data.replace(/\$OG_DESCRIPTION/g, `${res.name} ${res.cardNumber} is a ${res.rarity} card and has an average sale price of ${res.avgPrice}. Performance: ${res.dayChange}% in the past 24 hours.`);
        data = data.replace(/\$OG_URL/g, `https://transformersprices.com/card/${card_id}`);
        result = data.replace(/\$OG_IMAGE/g, `https://development.metamesh.io/${res.image}`);
        response.send(result);
      }
    });
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (request, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`))