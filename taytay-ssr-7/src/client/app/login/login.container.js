import {connect} from 'react-redux';
import {Login} from './login.component';
import {login} from '../redux/auth/auth.actions';

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
});

const mapStateToProps = state => ({
  isAuth: !!state.auth.token,
});

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
