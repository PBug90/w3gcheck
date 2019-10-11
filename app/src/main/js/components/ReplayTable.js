import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import ReplayTableRow from './ReplayTableRow';
import TablePaginationActions from './TablePaginationActions';

const styles = (theme) => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  tabs: {
    padding: theme.spacing.unit * 2,
  },
});

class ReplayTable extends React.Component { //eslint-disable-line
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    this.props.loadReplays(0, this.props.pagination.perPage);
  }

  handleChangePage(e, page) {
    this.props.loadReplays(page, this.props.pagination.perPage);
  }

  handleChangeRowsPerPage(e) {
    this.props.loadReplays(this.props.pagination.currentPage, e.target.value);
  }

  render() {
    const {
      replayList, replays, classes, selectReplay, pagination,
    } = this.props;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Players</TableCell>
              <TableCell>Matchup</TableCell>
              <TableCell>Map</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {replayList.map((r) => (
              <ReplayTableRow
                key={replays[r].md5}
                replay={replays[r]}
                selectReplay={selectReplay}
              />
            )) }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={pagination.totalReplayCount}
                rowsPerPage={pagination.perPage}
                page={pagination.currentPage}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
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
