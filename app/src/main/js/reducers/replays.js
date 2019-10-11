import { LOAD_REPLAYS_DONE } from '../actions/loadReplays';

export default function replayList(state = [], action) {
  switch (action.type) {
    case LOAD_REPLAYS_DONE:
      return action.payload.replays.map((r) => r.md5);
    default:
      return state;
  }
}
