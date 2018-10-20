import md5 from 'md5';
import fs from 'fs';
import parserPromise from 'AsyncReplayParser';
import db from '../database';


export const PARSE_REPLAY_ASYNC_DONE = 'PARSE_REPLAY_ASYNC_DONE';
export const PARSE_REPLAY_ASYNC_PENDING = 'PARSE_REPLAY_ASYNC_PENDING';
export const PARSE_REPLAY_ASYNC_ERROR = 'PARSE_REPLAY_ASYNC_ERROR';

export const PARSE_LAST_REPLAY_ASYNC_DONE = 'PARSE_LAST_REPLAY_ASYNC_DONE';
export const PARSE_LAST_REPLAY_ASYNC_PENDING = 'PARSE_LAST_REPLAY_ASYNC_PENDING';
export const PARSE_LAST_REPLAY_ASYNC_ERROR = 'PARSE_LAST_REPLAY_ASYNC_ERROR';

const cleanMapName = mapPath => mapPath.split('\\').pop();

const replayParserPromise = filepath => new Promise((resolve, reject) => {
  fs.readFile(filepath, (err, buf) => {
    if (err) {
      reject(err);
    }
    const hash = md5(buf);
    resolve(db.getReplay(hash)
      .then(replay => ({ ...replay, fromDB: true }))
      .catch(() => parserPromise(filepath).then((replayParsed) => {
        replayParsed.md5 = hash;
        replayParsed.meta.mapNameCleaned = cleanMapName(replayParsed.meta.mapName);
        replayParsed.insertDate = new Date();
        replayParsed.filepath = filepath;
        replayParsed.fromDB = false;
        return replayParsed;
      })));
  });
});


export function parseReplay(item, index) {
  return (dispatch) => {
    dispatch({ type: PARSE_REPLAY_ASYNC_PENDING, payload: index });
    return replayParserPromise(item.path)
      .then(replay => dispatch({
        type: PARSE_REPLAY_ASYNC_DONE,
        payload: {
          index, replay, md5: replay.md5, filepath: item, fromDB: replay.fromDB,
        },
      }))
      .catch((err) => {
        dispatch({ type: PARSE_REPLAY_ASYNC_ERROR, payload: { fileIndex: index, error: err } });
      });
  };
}


export function parseLastReplay(filepath, hash) {
  return (dispatch) => {
    dispatch({ type: PARSE_LAST_REPLAY_ASYNC_PENDING, payload: { filepath, hash } });
    return replayParserPromise(filepath)
      .then(replay => dispatch({
        type: PARSE_LAST_REPLAY_ASYNC_DONE,
        payload: {
          replay, md5: replay.md5, filepath,
        },
      }))
      .catch((err) => {
        dispatch({ type: PARSE_LAST_REPLAY_ASYNC_ERROR, payload: { filepath, error: err } });
      });
  };
}
