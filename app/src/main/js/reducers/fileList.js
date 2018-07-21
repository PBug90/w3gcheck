import path from 'path';
import { UPDATE_FILE_LIST } from '../actions/replaylist';

export default function fileList(state = [], action) {
  switch (action.type) {
    case UPDATE_FILE_LIST:
      return action.payload.map(l => ({
        base: path.basename(l), path: l, pending: false, finished: false,
      }));
    default:
      return state;
  }
}
