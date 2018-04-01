import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const withAuthHoc = WrappedComponent => {
  return class extends Component {
    render() {
      return this.props.isAuth ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      );
    }
  };
};

export const withAuth = component =>
  connect(state => ({
    isAuth: !!state.auth.token,
  }))(withAuthHoc(component));
