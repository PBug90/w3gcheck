import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';

import * as CounterActions from '../actions/replaylist';

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

const HomePage = (props) => <Home {...props} />;


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);
