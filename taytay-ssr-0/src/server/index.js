import express from 'express';
import {renderToString} from 'react-dom/server';
import App from '../client/app/app.component';
import * as React from 'react';
import {StaticRouter} from 'react-router';

const app = express();

app.use(express.static('dist'));

app.get('*', (req, res) => {
  const context = {};

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
         <script type="text/javascript" src="client.js"></script></body>
      </body>
    </html>`);
  }
});

app.listen(3000, () => console.log('app listening on port 3000'));
