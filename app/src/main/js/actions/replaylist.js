import md5 from 'md5';
import { push } from 'react-router-redux';
import parserPromise from 'AsyncReplayParser';
import db from '../database';


export const UPDATE_FILE_LIST = 'UPDATE_FILE_LIST';
export const SELECT_REPLAY = 'SELECT_REPLAY';
export const PARSE_REPLAY_ASYNC_DONE = 'PARSE_REPLAY_ASYNC_DONE';
export const PARSE_REPLAY_ASYNC_PENDING = 'PARSE_REPLAY_ASYNC_PENDING';
export const PARSE_REPLAY_ASYNC_ERROR = 'PARSE_REPLAY_ASYNC_ERROR';

const cleanMapName = mapPath => mapPath.split('/').pop();

export function selectReplay(hash) {
  return (dispatch) => {
    dispatch({ type: SELECT_REPLAY, payload: { md5: hash } });
    dispatch(push('/replay'));
  };
}

export function parseFiles(list) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_FILE_LIST,
      payload: list,
    });
    return Promise.all(getState().fileList.map((item, index) => {
      dispatch({ type: PARSE_REPLAY_ASYNC_PENDING, payload: index });
      const hash = md5(item.path);
      return db.getReplay(hash)
        .then((replay) => {
          if (replay) {
            return dispatch({
              type: PARSE_REPLAY_ASYNC_DONE,
              payload: { index, replay, md5: replay.md5 },
            });
          }
          return parserPromise(item.path).then((replayParsed) => {
              replayParsed.md5 = hash; //eslint-disable-line
              replayParsed.meta.mapNameCleaned = cleanMapName(replayParsed.meta.mapName); //eslint-disable-line
              replayParsed.insertDate = new Date();//eslint-disable-line
            return db.insertReplay(replayParsed).then(() => dispatch({
              type: PARSE_REPLAY_ASYNC_DONE,
              payload: { index, replay: replayParsed, md5: replayParsed.md5 },
            }));
          });
        }).catch((err) => {
          dispatch({ type: PARSE_REPLAY_ASYNC_ERROR, payload: err });
        });
    }));
  };
}
