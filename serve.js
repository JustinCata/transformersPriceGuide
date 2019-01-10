const express = require('express');
const requests = require('request');

const app = express();
const port = process.env.PORT || 3000;
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
    result = data.replace(/\$OG_IMAGE/g, 'https://cdn-images-1.medium.com/max/1400/1*PPcNDEdqiZdRTcdnNiW_tg.png'); // need
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
    result = data.replace(/\$OG_IMAGE/g, 'https://cdn-images-1.medium.com/max/1400/1*PPcNDEdqiZdRTcdnNiW_tg.png');
    response.send(result);
  });
});

app.get('/card/:cardName', (request, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    const cardName = request.params.cardName;
    requests(`https://development.metamesh.io/api/v1/guest/post?search=${cardName}`, (error, respons, body) => {
      if (!error && respons.statusCode == 200) {
        const res = JSON.parse(body);
        // console.log(res);
        
        data = data.replace(/\$OG_TITLE/g, `${res.posts[0].name} | Transformers TCG Prices`);
        data = data.replace(/\$OG_DESCRIPTION/g, `${res.posts[0].name} ${res.posts[0].cardNumber} is a ${res.posts[0].rarity} card and has an average sale price of ${res.posts[0].avgPrice}. Performance: ${res.posts[0].dayChange}% in the past 24 hours.`);
        data = data.replace(/\$OG_URL/g, `https://transformersprices.com/card/${cardName}`);
        result = data.replace(/\$OG_IMAGE/g, `https://development.metamesh.io/${res.posts[0].image}`);
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