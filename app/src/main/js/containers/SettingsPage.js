import { connect } from 'react-redux';
import SettingsPage from '../components/SettingsPage';

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps, null)(SettingsPage);
