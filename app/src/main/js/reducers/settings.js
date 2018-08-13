import { LOAD_SETTINGS, SAVE_SETTINGS } from '../actions/settings';

export default function replayList(state = { wc3FilePath: '' }, action) {
  switch (action.type) {
    case LOAD_SETTINGS:
      return action.payload;
    case SAVE_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}
