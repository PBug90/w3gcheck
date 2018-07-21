import { SELECT_REPLAY } from '../actions/replaylist';

export default function replayList(state = -1, action) {
  switch (action.type) {
    case SELECT_REPLAY:
      return action.payload.md5;
    default:
      return state;
  }
}
