import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import InboxIcon from '@material-ui/icons/Inbox';
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { loadSettings } from '../actions/settings';

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

class MainDrawer extends React.Component { //eslint-disable-line
  componentDidMount() {
    this.props.dispatch(loadSettings());
  }
  render() {
    const { classes, dispatch } = this.props;
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
          <ListItem button onClick={() => dispatch(push('/replays/add'))}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add replays" />
          </ListItem>
          <ListItem button onClick={() => dispatch(push('/replays'))}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Collection" />
          </ListItem>
          <ListItem button onClick={() => dispatch(push('/settings'))}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>

        </List>
        <List />
      </Drawer>);
  }
}

MainDrawer.propTypes = {
  dispatch: PropTypes.func,
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch => (
  {
    dispatch,
  }
);

export default connect(null, mapDispatchToProps)(withStyles(styles)(MainDrawer));
