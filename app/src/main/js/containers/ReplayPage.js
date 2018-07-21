import { connect } from 'react-redux';
import ReplayPage from '../components/ReplayPage';

function mapStateToProps(state) {
  return {
    replay: state.parsed[state.selected] || null,
  };
}

export default connect(mapStateToProps, null)(ReplayPage);
