import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReplayTable from '../components/ReplayTable';
import * as CounterActions from '../actions/replaylist';
import * as CounterActions2 from '../actions/loadReplays';

function mapStateToProps(state) {
  return {
    replayList: state.replays,
    replays: state.parsed,
    parsestatus: state.parsestatus,
    pagination: state.pagination,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, CounterActions, CounterActions2), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplayTable);
