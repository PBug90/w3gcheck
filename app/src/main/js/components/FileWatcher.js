import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fs from 'fs';
import md5 from 'md5';
import path from 'path';

import { parseLastReplay } from '../actions/parseReplay';
import { updateLastReplayHash } from '../actions/lastReplay';

class FileWatcher extends React.PureComponent { //eslint-disable-line
  componentDidMount() {
    this.updateFileWatchers(this.props.fileWatchers, this.props.lastReplayDirectory);
  }

  componentDidUpdate() {
    this.updateFileWatchers(this.props.fileWatchers, this.props.lastReplayDirectory);
  }

  updateFileWatchers(fileWatchers, lastReplayDirectory) {
    if (lastReplayDirectory) {
      if (this.lastReplayWatcher) {
        this.lastReplayWatcher.close();
      }
      this.lastReplayWatcher = fs.watch(`${lastReplayDirectory}`, { encoding: 'utf8' }, (eventType, filePath) => {
        fs.readFile(path.join(lastReplayDirectory, filePath), (err, buf) => {
          const hash = md5(buf);
          if (filePath && eventType === 'rename' && filePath === 'LastReplay.w3g' && hash !== this.props.lastReplayHash) {
            this.props.dispatch(updateLastReplayHash(hash));
            this.props.dispatch(parseLastReplay(path.join(lastReplayDirectory, filePath), hash));
          }
        });
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
    lastReplayHash: state.lastReplay.lastReplayHash,
  };
}

FileWatcher.propTypes = {
  fileWatchers: PropTypes.array,
  lastReplayDirectory: PropTypes.string,
  lastReplayHash: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)((FileWatcher));
