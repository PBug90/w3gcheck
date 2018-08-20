/* global describe it expect */


import reducer from '../selectReplay'; //eslint-disable-line
import { SELECT_REPLAY } from '../../actions/replaylist'; //eslint-disable-line


describe('selectReplay reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(-1);
  });

  it('should handle LOAD_REPLAYS_DONE', () => {
    expect(
      reducer([], {
        type: SELECT_REPLAY,
        payload: {
          md5: 'somehash',
        },
      }),
    ).toEqual('somehash');
  });
});
