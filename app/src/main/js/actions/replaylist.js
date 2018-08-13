
import { push } from 'react-router-redux';

import { parseReplay } from './parseReplay';

export const UPDATE_FILE_LIST = 'UPDATE_FILE_LIST';
export const SELECT_REPLAY = 'SELECT_REPLAY';


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
    return Promise.all(
      getState().fileList.map((item, index) => dispatch(parseReplay(item, index))),
    );
  };
}
