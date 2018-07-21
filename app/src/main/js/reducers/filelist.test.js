/* global describe it expect */
import reducer from './fileList';
import { UPDATE_FILE_LIST } from '../actions/replaylist';

describe('fileList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle UPDATE_FILE_LIST', () => {
    expect(
      reducer([], {
        type: UPDATE_FILE_LIST,
        payload: ['filepath1', 'filepath2'],
      }),
    ).toEqual([
      {
        base: 'filepath1', path: 'filepath1', pending: false, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ]);
  });
});
