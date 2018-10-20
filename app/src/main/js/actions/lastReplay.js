export const UPDATE_LAST_REPLAY_HASH = 'UPDATE_LAST_REPLAY_HASH';

export function updateLastReplayHash(newHash) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LAST_REPLAY_HASH,
      payload: newHash,
    });
  };
}
