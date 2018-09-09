import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddReplaysTable from '../components/AddReplaysTable';
import { parseFiles } from '../actions/replaylist';

const { dialog } = require('electron').remote;

class AddReplaysPage extends React.Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
  }

  showDialog() {
    const result = dialog.showOpenDialog({ properties: ['multiSelections', 'openFile'] });
    if (result) { this.props.dispatch(parseFiles(result)); }
  }

  render() {
    const { parsed, fileList, parsestatus } = this.props;
    return (
      <div>
        <Button variant="outlined" onClick={this.showDialog}>Parse Replays</Button>
        <span>currently parsing: {parsestatus.parsing}, parsing errors: {parsestatus.errors}</span>
        <AddReplaysTable files={fileList} parsed={parsed} />
      </div>
    );
  }
}

AddReplaysPage.propTypes = {
  parsed: PropTypes.object,
  dispatch: PropTypes.func,
  fileList: PropTypes.array,
  parsestatus: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    fileList: state.fileList,
    parsestatus: state.parsestatus,
    parsed: state.parsed,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReplaysPage);
