export const FILE_CHANGED = 'FILE_CHANGED';
export const LAST_REPLAY_CHANGED = 'LAST_REPLAY_CHANGED';
export const ADD_WATCH_DIRECTORY = 'ADD_WATCH_DIRECTORY';

const path = require('path');

export function fileChanged(filepath) {
  return {
    type: FILE_CHANGED,
    payload: filepath,
  };
}

export function lastReplayChanged({ filePath, eventType, dirPath }) {
  if (eventType === 'rename' && filePath === 'LastReplay.w3g') {
    console.log('We detected a new LastReplay.w3g');
  }
  return {
    type: LAST_REPLAY_CHANGED,
    payload: { filePath, fullPath: path.join(dirPath, filePath) },
  };
}

export function addWatchDirectory(directoryPath) {
  return {
    type: ADD_WATCH_DIRECTORY,
    payload: directoryPath,
  };
}
