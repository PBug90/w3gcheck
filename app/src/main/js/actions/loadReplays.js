import db from '../database';

export const LOAD_REPLAYS_PENDING = 'LOAD_REPLAYS_PENDING';
export const LOAD_REPLAYS_DONE = 'LOAD_REPLAYS_DONE';
export const LOAD_REPLAYS_ERROR = 'LOAD_REPLAYS_ERROR';

export function loadReplays(page = 0, perPage = 10, filter = {}) {
  return (dispatch) => {
    dispatch({ type: LOAD_REPLAYS_PENDING, payload: { page, perPage } });
    return db.getReplays(page, perPage, filter)
      .then((result) => {
        db.getReplayCount().then((count) => dispatch({
          type: LOAD_REPLAYS_DONE,
          payload: {
            page,
            perPage,
            replays: result,
            totalReplayCount: count,
            totalPages: Math.ceil(count / perPage),
            filter,
          },
        }));
      })
      .catch((err) => dispatch({ type: LOAD_REPLAYS_ERROR, payload: err.message }));
  };
}
