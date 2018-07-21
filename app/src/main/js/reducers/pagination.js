import { LOAD_REPLAYS_DONE } from '../actions/loadReplays';

export default function replayList(state = { currentPage: 0, perPage: 0, totalPages: 0 }, action) {
  switch (action.type) {
    case LOAD_REPLAYS_DONE:
      return {
        currentPage: action.payload.page,
        perPage: action.payload.perPage,
        totalPages: action.payload.totalPages,
      };
    default:
      return state;
  }
}
