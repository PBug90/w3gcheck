import {
  PARSE_REPLAY_ASYNC_DONE,
  PARSE_REPLAY_ASYNC_ERROR,
  PARSE_REPLAY_ASYNC_PENDING,
}
  from '../actions/parseReplay';

export default function parsed(state = { parsing: 0, errors: 0 }, action) {
  switch (action.type) {
    case PARSE_REPLAY_ASYNC_DONE:
      return { ...state, parsing: state.parsing - 1 };
    case PARSE_REPLAY_ASYNC_ERROR:
      return { ...state, parsing: state.parsing - 1, errors: state.errors + 1 };
    case PARSE_REPLAY_ASYNC_PENDING:
      return { ...state, parsing: state.parsing + 1 };
    default:
      return state;
  }
}
