import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: theme.spacing.unit * 3,
  }),
});

export default withStyles(styles)(props => (
  <div className={props.classes.root}>
    {props.children}
  </div>
));
