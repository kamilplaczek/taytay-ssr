require('es6-promise').polyfill();
import express from 'express';
import {renderToNodeStream} from 'react-dom/server';
import App from '../client/app/app.component';
import * as React from 'react';
import {StaticRouter, matchPath} from 'react-router';
import {routes} from '../client/app/app.routes';
import {Provider} from 'react-redux';
import {createAppStore} from '../client/create-store';
import cache from 'memory-cache';
import {createCacheStream} from './cache-stream';

const app = express();
app.use(express.static('dist'));

app.use((req, res, next) => {
  const cachedHtml = cache.get(req.originalUrl);
  if (cachedHtml) {
    res.send(cachedHtml);
  } else {
    next();
  }
});

app.post('/api/login', (req, res) => {
  res.json({
    token: '... ready for it?',
  });
});

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

  const cacheStream = createCacheStream(req.path, cache);
  cacheStream.pipe(res);

  const state = store.getState();

  cacheStream.write(`<!DOCTYPE html>
    <html>
      <head>
        <title>Taylor Swift</title>
        <link href="styles.css" rel="stylesheet">
      </head>
      
      <body>
        <div id="root">`);

  const appStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  appStream.pipe(cacheStream, {end: false});

  appStream.on('end', () => {
    cacheStream.end(`
          </div>
            <script>
              window.APP_STATE = ${JSON.stringify(state)};
            </script>
             <script type="text/javascript" src="client.js"></script>
          </body>
        </html>`);
  });
});

app.listen(3007, () => console.log('app listening on port 3007'));
