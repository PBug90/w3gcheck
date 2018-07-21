import { PARSE_REPLAY_ASYNC_DONE } from '../actions/replaylist';
import { LOAD_REPLAYS_DONE } from '../actions/loadReplays';

export default function parsed(state = {}, action) {
  const subState = {};
  switch (action.type) {
    case PARSE_REPLAY_ASYNC_DONE:
      return { ...state, [action.payload.replay.md5]: action.payload.replay };
    case LOAD_REPLAYS_DONE:
      action.payload.replays.forEach((r) => {
        subState[r.md5] = r;
      });
      return { ...state, ...subState };
    default:
      return state;
  }
}
