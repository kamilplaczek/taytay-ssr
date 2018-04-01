require('es6-promise').polyfill();
import express from 'express';
import {renderToString} from 'react-dom/server';
import App from '../client/app/app.component';
import * as React from 'react';
import {StaticRouter, matchPath} from 'react-router';
import {routes} from '../client/app/app.routes';
import {Provider} from 'react-redux';
import {createAppStore} from '../client/create-store';

const app = express();
app.use(express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};
  const store = createAppStore({});

  const matchedRoute = routes.find(route => matchPath(req.path, route));
  if (matchedRoute) {
    if (matchedRoute.component && matchedRoute.component.loadData) {
      await matchedRoute.component.loadData(store);
    }
  } else {
    return res.sendStatus(404);
  }

  const appString = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    // redirect was done in client-side routing
    res.redirect(301, context.url);
  } else {
    const state = store.getState();
    res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>Taylor Swift</title>
        <link href="styles.css" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">${appString}</div>
        <script>
          window.APP_STATE = ${JSON.stringify(state)};
        </script>
         <script type="text/javascript" src="client.js"></script>
      </body>
    </html>`);
  }
});

app.listen(3000, () => console.log('app listening on port 3000'));
