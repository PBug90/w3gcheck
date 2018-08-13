import db from '../database';

export const SAVE_REPLAY_ASYNC_DONE = 'SAVE_REPLAY_ASYNC_DONE';
export const SAVE_REPLAY_ASYNC_PENDING = 'SAVE_REPLAY_ASYNC_PENDING';
export const SAVE_REPLAY_ASYNC_ERROR = 'SAVE_REPLAY_ASYNC_ERROR';

export function saveReplay(replay, fileIndex) {
  return (dispatch) => {
    dispatch({ type: SAVE_REPLAY_ASYNC_PENDING, payload: replay });
    if (!replay.md5 || !replay.filepath) {
      return dispatch({ type: SAVE_REPLAY_ASYNC_ERROR, payload: { replay, error: 'No md5 property.' } });
    }
    return db.insertReplay(replay)
      .then(inserted => dispatch({
        type: SAVE_REPLAY_ASYNC_DONE,
        payload: {
          inserted,
          fileIndex,
        },
      }));
  };
}
