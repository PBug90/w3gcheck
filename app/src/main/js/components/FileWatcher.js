import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fs from 'fs';

import { lastReplayChanged } from '../actions/fileWatcher';

class FileWatcher extends React.Component { //eslint-disable-line
  componentDidMount() {
    this.updateFileWatchers(this.props.fileWatchers, this.props.lastReplayDirectory);
  }

  componentDidUpdate() {
    this.updateFileWatchers(this.props.fileWatchers, this.props.lastReplayDirectory);
  }

  updateFileWatchers(fileWatchers, lastReplayDirectory) {
    if (lastReplayDirectory) {
      console.log(`Watching ${lastReplayDirectory}`);
      if (this.lastReplayWatcher) {
        this.lastReplayWatcher.close();
      }
      this.lastReplayWatcher = fs.watch(`${lastReplayDirectory}`, { encoding: 'utf8' }, (eventType, filePath) => {
        if (filePath) {
          this.props.dispatch(
            lastReplayChanged({ filePath, eventType, dirPath: lastReplayDirectory }),
          );
        }
      });
    }
  }


  render() {
    return (
      <div />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return ({ dispatch });
}

function mapStateToProps(state) {
  return {
    lastReplayDirectory: state.settings.lastReplayDirectory,
  };
}

FileWatcher.propTypes = {
  fileWatchers: PropTypes.array,
  lastReplayDirectory: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)((FileWatcher));
