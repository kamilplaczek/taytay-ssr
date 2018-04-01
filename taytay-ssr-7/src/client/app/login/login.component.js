import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

export class Login extends Component {
  handleLoginClick = () => {
    this.props.login();
  };

  render() {
    return this.props.isAuth ? <Redirect to="/secret" /> : <button onClick={this.handleLoginClick}>Login!</button>;
  }
}
