import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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
      <Paper >
        <Toolbar>
          <Grid container>
            <Grid item xs={4}>
              <Button variant="outlined" onClick={this.showDialog}>Parse Replays</Button>
            </Grid>
            <Grid item xs={4}>
              {parsestatus.errors > 0 &&
              <Typography color="error">{parsestatus.errors} parse error(s)</Typography>
          }
            </Grid>
          </Grid>
        </Toolbar>
        <AddReplaysTable files={fileList} parsed={parsed} />
      </Paper>
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
