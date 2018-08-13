import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import ParsedFileTableRow from './ParsedFileTableRow';


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


class ReplayTable extends React.Component { //eslint-disable-line
  render() {
    const {
      parsed, files, classes, dispatch,
    } = this.props;
    return (
      <div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Players</TableCell>
              <TableCell>Matchup</TableCell>
              <TableCell>Map</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {files.map((f, index) =>
              (<ParsedFileTableRow
                dispatch={dispatch}
                fileInfo={f}
                replay={parsed[f.md5]}
                index={index}
              />))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

ReplayTable.propTypes = {
  classes: PropTypes.object,
  parsed: PropTypes.object,
  files: PropTypes.array,
  dispatch: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ReplayTable));
