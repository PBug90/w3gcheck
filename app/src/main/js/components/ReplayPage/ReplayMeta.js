import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { convertTime } from '../../utility/replay';

const styles = (theme) => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const ReplayMeta = ({
  classes, observers = [], filepath, matchup, map, creator, gamename, duration, speed, version
}) => (
  <Paper className={classes.root}>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>Version</TableCell>
          <TableCell>
            {version}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Map</TableCell>
          <TableCell>{map}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Creator</TableCell>
          <TableCell>{creator}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Game name</TableCell>
          <TableCell>{gamename}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Speed</TableCell>
          <TableCell>{speed}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Duration</TableCell>
          <TableCell>
            {convertTime(duration)}
            {' '}
min
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Observers</TableCell>
          <TableCell>{observers.join(', ') || '-'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Filepath</TableCell>
          <TableCell>{filepath}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">Matchup</TableCell>
          <TableCell>{matchup}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>
);


ReplayMeta.propTypes = {
  meta: PropTypes.object,
  classes: PropTypes.object,
  observers: PropTypes.array,
  filepath: PropTypes.string,
  matchup: PropTypes.string,
};

export default withStyles(styles)(ReplayMeta);
