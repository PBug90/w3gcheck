import { ADD_WATCH_DIRECTORY }
  from '../actions/fileWatcher';

export default function fileWatchers(state = ['O:\\'], action) {
  switch (action.type) {
    case ADD_WATCH_DIRECTORY:
      return [...state, action.payload];

    default:
      return state;
  }
}
