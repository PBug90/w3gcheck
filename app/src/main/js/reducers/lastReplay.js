import { UPDATE_LAST_REPLAY_HASH } from '../actions/lastReplay';

export default function lastReplay(state = { lastReplayHash: null }, action) {
  switch (action.type) {
    case UPDATE_LAST_REPLAY_HASH:
      return { ...state, lastReplayHash: action.payload };
    default:
      return state;
  }
}
