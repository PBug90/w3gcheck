import { connect } from 'react-redux';
import W3GStreamPage from '../components/W3GStreamPage';

function mapStateToProps(state) {
  return {
    settings: state.settings,
    w3gstream: state.w3gstream,
  };
}


export default connect(mapStateToProps, null)(W3GStreamPage);
