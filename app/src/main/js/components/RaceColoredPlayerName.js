import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { raceTextColorStyles } from '../utility';

const RaceColoredPlayerName = withStyles(raceTextColorStyles)((props) => {
  const { race, name, classes } = props;
  return (
    <div className={classes[race || 0]}>{name}</div>
  );
});

export default RaceColoredPlayerName;
