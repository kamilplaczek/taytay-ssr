require('es6-promise').polyfill();
import express from 'express';
import {renderToString} from 'react-dom/server';
import App from '../client/app/app.component';
import * as React from 'react';
import {StaticRouter, matchPath} from 'react-router';
import {routes} from '../client/app/app.routes';

const app = express();
app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};

  const matchedRoute = routes.find(route => matchPath(req.path, route));
  if (matchedRoute) {
    if (matchedRoute.component && matchedRoute.component.loadData) {
      context.data = await matchedRoute.component.loadData();
    }
  } else {
    return res.sendStatus(404);
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
          window.APP_STATE = ${JSON.stringify({data: context.data})};
        </script>
         <script type="text/javascript" src="client.js"></script>
      </body>
    </html>`);
  }
});

app.listen(3000, () => console.log('app listening on port 3000'));
