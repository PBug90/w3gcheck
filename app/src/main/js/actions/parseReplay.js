import md5 from 'md5';
import parserPromise from 'AsyncReplayParser';
import db from '../database';

export const PARSE_REPLAY_ASYNC_DONE = 'PARSE_REPLAY_ASYNC_DONE';
export const PARSE_REPLAY_ASYNC_PENDING = 'PARSE_REPLAY_ASYNC_PENDING';
export const PARSE_REPLAY_ASYNC_ERROR = 'PARSE_REPLAY_ASYNC_ERROR';

const cleanMapName = mapPath => mapPath.split('\\').pop();

export function parseReplay(item, index) {
  return (dispatch) => {
    dispatch({ type: PARSE_REPLAY_ASYNC_PENDING, payload: index });
    const hash = md5(item.path);
    return db.getReplay(hash)
      .then((replay) => {
        if (replay) {
          return dispatch({
            type: PARSE_REPLAY_ASYNC_DONE,
            payload: {
              index, replay, md5: replay.md5, filepath: item, fromDB: true,
            },
          });
        }
        return parserPromise(item.path).then((replayParsed) => {
          replayParsed.md5 = hash;
          replayParsed.meta.mapNameCleaned = cleanMapName(replayParsed.meta.mapName);
          replayParsed.insertDate = new Date();
          replayParsed.filepath = item.path;
          dispatch({
            type: PARSE_REPLAY_ASYNC_DONE,
            payload: {
              index, replay: replayParsed, md5: replayParsed.md5, fromDB: false,
            },
          });
        });
      }).catch((err) => {
        dispatch({ type: PARSE_REPLAY_ASYNC_ERROR, payload: err });
      });
  };
}
