import { connect } from 'react-redux';

import App from './component';

import { AppState } from '../../store';
import { incrementCount } from '../../store/counter/actions';


const mapStateToProps = (state: AppState) => ({
  counter: state.counter
});

export default connect(
  mapStateToProps,
  { incrementCount }
)(App);
