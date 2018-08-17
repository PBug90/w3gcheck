import path from 'path';
import { UPDATE_FILE_LIST } from '../actions/replaylist';
import {
  PARSE_REPLAY_ASYNC_DONE,
  PARSE_REPLAY_ASYNC_PENDING,
  PARSE_REPLAY_ASYNC_ERROR,
}
  from '../actions/parseReplay';
import { SAVE_REPLAY_ASYNC_DONE } from '../actions/saveReplay';

export default function fileList(state = [], action) {
  let newState = null;
  switch (action.type) {
    case UPDATE_FILE_LIST:
      return action.payload.map(l => ({
        base: path.basename(l), path: l, pending: false, finished: false,
      }));

    case PARSE_REPLAY_ASYNC_DONE:
      newState = state.slice(0);
      newState[action.payload.index].md5 = action.payload.md5;
      newState[action.payload.index].fromDB = action.payload.fromDB;
      return newState;

    case PARSE_REPLAY_ASYNC_PENDING:
      newState = state.slice(0);
      newState[action.payload].pending = true;
      return newState;

    case PARSE_REPLAY_ASYNC_ERROR:
      newState = state.slice(0);
      newState[action.payload.fileIndex].pending = false;
      return newState;

    case SAVE_REPLAY_ASYNC_DONE:
      newState = state.slice(0);
      newState[action.payload.fileIndex].fromDB = true;
      newState[action.payload.fileIndex].pending = false;
      return newState;

    default:
      return state;
  }
}
