import React from 'react';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import deepPurple from '@material-ui/core/colors/deepPurple';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    margin: 0,
    color: '#fff',
  },
  H: {
    backgroundColor: blue[800],
  },
  O: {
    backgroundColor: deepOrange[800],
  },
  U: {
    backgroundColor: deepPurple[800],
  },
  N: {
    backgroundColor: green[800],
  },
  column: {
    flexBasis: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tester: {
  },
});

export default withStyles(styles)(({
  classes, isObs, playerInfo,
}) => (
  <ExpansionPanel elevation={1} className={classes.tester} expanded>
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <div className={classes.column}>
        { !isObs
          && <Avatar className={classes[playerInfo.race || 0]}>{playerInfo.race ? playerInfo.race[0].toUpperCase() : '?'}</Avatar>}
      </div>
      <div className={classes.column}>
        <Typography className={classes.heading}>{playerInfo.name}</Typography>
      </div>
      <div className={classes.column}>
        <Typography variant="caption" gutterBottom align="center">
          {playerInfo.apm}
          {' '}
APM
        </Typography>
      </div>

    </ExpansionPanelSummary>
    <ExpansionPanelDetails />
  </ExpansionPanel>
));
