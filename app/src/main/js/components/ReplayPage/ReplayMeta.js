import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { convertTime } from '../../utility/replay';

const styles = theme => ({
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
  classes, meta, observers = [], filepath, matchup,
}) => (
  <Paper className={classes.root}>
    <Table>
      <TableBody>
        <TableRow >
          <TableCell>Version</TableCell>
          <TableCell >1.{meta.version}
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Map</TableCell>
          <TableCell >{meta.mapName}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Map Checksum</TableCell>
          <TableCell >{meta.mapChecksum}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Creator</TableCell>
          <TableCell >{meta.creator}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Game name</TableCell>
          <TableCell >{meta.gameName}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Speed</TableCell>
          <TableCell >{meta.speed}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Duration</TableCell>
          <TableCell >{convertTime(meta.replayLengthMS)} min</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Observers</TableCell>
          <TableCell >{observers.join(', ') || '-'}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Filepath</TableCell>
          <TableCell >{filepath}</TableCell>
        </TableRow>
        <TableRow >
          <TableCell scope="row">Matchup</TableCell>
          <TableCell >{matchup}</TableCell>
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
