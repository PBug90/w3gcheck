import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import fileList from './fileList';
import selected from './selectReplay';
import parsed from './parsedReplays';
import parsestatus from './parsestatus';
import replays from './replays';
import pagination from './pagination';
import settings from './settings';
import fileWatchers from './fileWatcher';
import lastReplay from './lastReplay';
import w3gstream from './w3gstream';

const rootReducer = (history) => {
  console.log(history);
  return combineReducers({
    fileList,
    form: formReducer,
    selected,
    parsed,
    parsestatus,
    replays,
    pagination,
    settings,
    fileWatchers,
    lastReplay,
    w3gstream,
    router: connectRouter(history),
  });
};

export default rootReducer;
