import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

class W3GStreamPage extends React.Component { //eslint-disable-line
  render() {
    return (
      <Paper>
        <h1>This is a placeholder.</h1>
        {this.props.settings.lastReplayDirectory}
        <ul>
            History of LastReplay.w3g changes:
          {Object.keys(this.props.w3gstream.history).map((hash) => <li>{hash}</li>)}
        </ul>
      </Paper>
    );
  }
}

W3GStreamPage.propTypes = {
  w3gstream: PropTypes.shape({
    history: PropTypes.array,
  }),
  settings: PropTypes.shape({
    lastReplayDirectory: PropTypes.string,
  }),
};

export default withStyles({})(W3GStreamPage);
