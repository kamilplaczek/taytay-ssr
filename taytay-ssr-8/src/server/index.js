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
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.static('dist'));
app.use(cookieParser());

app.use((req, res, next) => {
  const cachedHtml = cache.get(req.originalUrl);
  if (cachedHtml) {
    console.log('cached!');
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
  const token = req.cookies.taytayAuth;

  const store = createAppStore({
    auth: {
      token,
    },
  });

  const matchedRoute = routes.find(route => matchPath(req.path, route));
  if (matchedRoute) {
    if (matchedRoute.private && !token) {
      return res.redirect(301, '/login');
    } else if (matchedRoute.component && matchedRoute.component.loadData) {
      await matchedRoute.component.loadData(store);
    }
  } else {
    return res.sendStatus(404);
  }

  let stream;

  if (matchedRoute.private) {
    stream = res;
  } else {
    stream = createCacheStream(req.path, cache);
    stream.pipe(res);
  }

  const state = store.getState();

  stream.write(`<!DOCTYPE html>
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

  appStream.pipe(stream, {end: false});

  appStream.on('end', () => {
    stream.end(`
          </div>
            <script>
              window.APP_STATE = ${JSON.stringify(state)};
            </script>
             <script type="text/javascript" src="client.js"></script>
          </body>
        </html>`);
  });
});

app.listen(3000, () => console.log('app listening on port 3000'));
