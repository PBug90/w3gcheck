import { UPDATE_LAST_REPLAY_HASH } from '../actions/lastReplay';
import { PARSE_LAST_REPLAY_ASYNC_DONE, PARSE_LAST_REPLAY_ASYNC_PENDING, PARSE_LAST_REPLAY_ASYNC_ERROR } from '../actions/parseReplay';

export default function replayList(state = { history: {} }, action) {
  switch (action.type) {
    case UPDATE_LAST_REPLAY_HASH:
      return {
        ...state,
        history: { ...state.history, [action.payload]: { pending: false, error: null } },
      };
    case PARSE_LAST_REPLAY_ASYNC_PENDING:
      return {
        ...state,
        history: { ...state.history, [action.payload.hash]: { pending: true, error: null } },
      };
    case PARSE_LAST_REPLAY_ASYNC_DONE:
      return {
        ...state,
        history: { ...state.history, [action.payload.md5]: { pending: false, error: null } },
      };
    case PARSE_LAST_REPLAY_ASYNC_ERROR:
      return {
        ...state,
        history: {
          ...state.history,
          [action.payload.hash]: { pending: false, error: action.payload.error },
        },
      };
    default:
      return state;
  }
}
