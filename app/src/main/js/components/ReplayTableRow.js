import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { raceTextColorStyles } from '../utility';
import { convertTime } from '../utility/replay';

const ParsedItemContent = withStyles(raceTextColorStyles)((props) => {
  const { replay, classes } = props;
  const players = Object.values(replay.players).map(
    player => <div key={player.id} className={classes[player.race || 0]}>{player.name}</div>,
  );

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2" gutterBottom>
          {players}
        </Typography>
      </TableCell>
      <TableCell>
        {replay.meta.mapNameCleaned}
      </TableCell>
      <TableCell>
        {convertTime(replay.header.replayLengthMS)}
      </TableCell>
      <TableCell>
        <Button onClick={() => props.selectReplay(replay.md5)}>
        View
        </Button>
      </TableCell>
    </TableRow>
  );
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}), dispatch);
}

export default connect(null, mapDispatchToProps)(ParsedItemContent);
