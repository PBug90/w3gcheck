import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


const styles = theme => ({
  root: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
    width: 360,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

const mapDispatchToProps = dispatch => (
  {
    push: url => dispatch(push(url)),
  }
);

export default connect(null, mapDispatchToProps)(withStyles(styles)((props) => {
  const {
    classes,
  } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Typography align="center" variant="headline" gutterBottom>
             W3GCheck
      </Typography>
      <Divider />
      <List>
        <ListItem button onClick={() => props.push('/replays')}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Replays" />
        </ListItem>
        <ListItem button onClick={() => props.push('/settings')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

      </List>
      <List />
    </Drawer>);
}));
