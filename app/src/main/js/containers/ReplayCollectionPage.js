import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ReplayTable from '../components/ReplayTable';
import * as replayListActions from '../actions/replaylist';
import * as loadReplaysActions from '../actions/loadReplays';


const styles = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const ReplayCollectionPage = (props) => (
  <Paper>
    <Toolbar>
      <Typography variant="title" id="tableTitle">
            Your replay collection
      </Typography>
    </Toolbar>
    <ReplayTable {...props} />
  </Paper>
);


function mapStateToProps(state) {
  return {
    replayList: state.replays,
    replays: state.parsed,
    parsestatus: state.parsestatus,
    pagination: state.pagination,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...replayListActions, ...loadReplaysActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(ReplayCollectionPage),
);
