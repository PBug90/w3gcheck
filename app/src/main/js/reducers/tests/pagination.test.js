/* global describe it expect */
import reducer from '../pagination';
import { LOAD_REPLAYS_DONE } from '../../actions/loadReplays';

describe('pagination reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currentPage: 0, perPage: 25, totalPages: 0, totalReplayCount: 0,
    });
  });

  it('should handle LOAD_REPLAYS_DONE', () => {
    const page = 1;
    const perPage = 15;
    const replays = [];
    const totalPages = 1;

    expect(
      reducer({}, {
        type: LOAD_REPLAYS_DONE,
        payload: {
          page, perPage, replays, totalPages,
        },
      }),
    ).toEqual({ currentPage: page, perPage, totalPages });
  });
});
