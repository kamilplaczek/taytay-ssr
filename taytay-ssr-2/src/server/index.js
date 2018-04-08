require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';
import express from 'express';
import {renderToString} from 'react-dom/server';
import App from '../client/app/app.component';
import * as React from 'react';
import {StaticRouter} from 'react-router';

const getTaytayPics = async () => {
  const res = await fetch('https://api.imgur.com/3/gallery/r/taylorswift', {
    headers: {Authorization: 'Client-ID 0447601918a7bb5'},
  });
  const imgurResp = await res.json();
  if (imgurResp.data) {
    const pics = imgurResp.data
                           .filter(pic => pic.link.indexOf('.jpg') > -1)
                           .slice(0, 15)
                           .map(pic => ({id: pic.id, url: pic.link.replace('.jpg', 's.jpg')}));
    return pics;
  }
};

const app = express();
app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};

  if (req.url === '/') {
    context.pics = await getTaytayPics();
  }

  const appString = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    // redirect was done in client-side routing
    res.redirect(301, context.url);
  } else {
    res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>Taylor Swift</title>
        <link href="styles.css" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">${appString}</div>
        <script>
          window.APP_STATE = ${JSON.stringify({pics: context.pics})};
        </script>
         <script type="text/javascript" src="client.js"></script>
      </body>
    </html>`);
  }
});

app.listen(3002, () => console.log('app listening on port 3002'));
