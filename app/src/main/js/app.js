import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HomeView from './containers/HomePage';
import ReplayPage from './containers/ReplayPage';
import W3GStreamPage from './containers/W3GStream';

import Drawer from './components/Drawer';
import SettingsPage from './components/SettingsPage';
import ReplayCollectionPage from './containers/ReplayCollectionPage';
import AddReplaysPage from './containers/AddReplaysPage';
import FileWatcher from './components/FileWatcher';

const styles = (theme) => ({
  root: {
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

const App = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer />
      <FileWatcher />
      <main className={classes.content}>
        <Route exact path="/" component={HomeView} />
        <Route exact path="/replay" component={ReplayPage} />
        <Route exact path="/replays" component={ReplayCollectionPage} />
        <Route exact path="/replays/add" component={AddReplaysPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route exact path="/w3gstream" component={W3GStreamPage} />
      </main>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(App);
