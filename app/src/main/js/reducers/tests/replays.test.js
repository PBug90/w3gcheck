/* global describe it expect */
import reducer from '../replays';
import { LOAD_REPLAYS_DONE } from '../../actions/loadReplays';

describe('replays reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle LOAD_REPLAYS_DONE', () => {
    const replays = [{ md5: 'hash1', one: 1, two: 1 }, { md5: 'hash2', one: 2, two: 2 }];

    expect(
      reducer([], {
        type: LOAD_REPLAYS_DONE,
        payload: {
          page: 1, pageSize: 15, totalPages: 5, replays,
        },
      }),
    ).toEqual(['hash1', 'hash2']);
  });
});
