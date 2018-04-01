import React, {Component} from 'react';
import './app.component.css';
import {Link, Route} from 'react-router-dom';
import {routes} from './app.routes';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div>
          <div className="navbar">
            <span className="brand">Taylor Swift</span>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/secret">Secret</Link>
              </li>
            </ul>
          </div>
          <hr />
          {routes.map((route, index) => <Route key={index} {...route} />)}
        </div>
      </div>
    );
  }
}
