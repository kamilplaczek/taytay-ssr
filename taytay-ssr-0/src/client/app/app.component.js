import React, {Component} from 'react';
import {Home} from './home/home.component';
import './app.component.css';
import {Contact} from './contact/contact.component';
import {Link, Route} from 'react-router-dom';

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
            </ul>
          </div>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
        </div>
      </div>
    );
  }
}
