import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReplayTableRow from './ReplayTableRow';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  tabs: {
    padding: theme.spacing.unit * 2,
  },
});

class ReplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }


  refresh() {
    this.props.loadReplays(1, 25);
  }

  previousPage() {
    this.props.loadReplays(
      this.props.pagination.currentPage > 1 ? this.props.pagination.currentPage - 1 : 1,
      25,
    );
  }

  nextPage() {
    this.props.loadReplays(this.props.pagination.currentPage + 1, 25);
  }

  render() {
    const {
      replayList, replays, classes, selectReplay, pagination,
    } = this.props;
    return (
      <div>
        <Button variant="outlined" className={classes.button} onClick={this.refresh}>
          Refresh
        </Button>
        <Button disabled={pagination.currentPage === 1} variant="outlined" className={classes.button} onClick={this.previousPage}>
          previous Page
        </Button>
        <Button disabled={pagination.currentPage === pagination.totalPages} variant="outlined" className={classes.button} onClick={this.nextPage}>
          next Page
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Players</TableCell>
              <TableCell>Matchup</TableCell>
              <TableCell>Map</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {replayList.map(r =>
              (<ReplayTableRow
                key={replays[r].md5}
                replay={replays[r]}
                selectReplay={selectReplay}
              />)) }
          </TableBody>
        </Table>
      </div>
    );
  }
}


ReplayTable.propTypes = {
  replayList: PropTypes.array,
  replays: PropTypes.object,
  classes: PropTypes.object,
  selectReplay: PropTypes.func,
  loadReplays: PropTypes.func,
  pagination: PropTypes.object,
};

export default withStyles(styles)(ReplayTable);
