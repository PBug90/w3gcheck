import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import fileList from './fileList';
import selected from './selectReplay';
import parsed from './parsedReplays';
import parsestatus from './parsestatus';
import replays from './replays';
import pagination from './pagination';
import settings from './settings';
import fileWatchers from './fileWatcher';

const rootReducer = combineReducers({
  fileList,
  form: formReducer,
  selected,
  parsed,
  parsestatus,
  replays,
  pagination,
  settings,
  fileWatchers,
  router: routerReducer,
});

export default rootReducer;
