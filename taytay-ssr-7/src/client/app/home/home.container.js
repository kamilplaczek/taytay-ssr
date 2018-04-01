import {connect} from 'react-redux';
import {fetchPics} from '../redux/taytay/taytay.actions';
import {Home} from './home.component';

const mapStateToProps = ({taytay}) => ({pics: taytay.pics});

const mapDispatchToProps = dispatch => ({
  fetchPics: () => dispatch(fetchPics()),
});

export const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
