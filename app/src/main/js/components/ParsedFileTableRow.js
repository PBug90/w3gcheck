import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

import { saveReplay } from '../actions/saveReplay';
import { selectReplay } from '../actions/replaylist';
import RaceColoredPlayerName from './RaceColoredPlayerName';

const ParsedFileTableRow = (props) => {
  const {
    replay, fileInfo, dispatch, index,
  } = props;
  let players = null;
  if (replay) {
    players = Object.values(replay.players).map(
      (player) => (
        <RaceColoredPlayerName
          name={player.name}
          race={player.detectedRace || player.race || 0}
        />
      ),
    );
  }
  return (
    <TableRow>
      <TableCell>
        <Typography variant="body2" gutterBottom>
          {players}
        </Typography>
      </TableCell>
      <TableCell>
        {!fileInfo.md5 && fileInfo.path}
        {fileInfo.md5 && replay.matchup}
      </TableCell>
      <TableCell>
        {replay && replay.map.cleaned}
      </TableCell>
      <TableCell>

        <Button
          disabled={fileInfo.fromDB === true || !replay}
          onClick={() => dispatch(saveReplay({ ...replay, ...fileInfo }, index))}
        >
          Add to Collection
        </Button>

        {replay
        && (
        <Button onClick={() => dispatch(selectReplay(fileInfo.md5))}>
          View details
        </Button>
        )}

      </TableCell>
    </TableRow>
  );
};

ParsedFileTableRow.propTypes = {
  replay: PropTypes.object,
  fileInfo: PropTypes.object,
  dispatch: PropTypes.func,
  index: PropTypes.number,
};


export default ParsedFileTableRow;
