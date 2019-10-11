import reducer from '../parsestatus';
import {
  PARSE_REPLAY_ASYNC_DONE,
  PARSE_REPLAY_ASYNC_PENDING,
  PARSE_REPLAY_ASYNC_ERROR,
}
  from '../../actions/parseReplay';

describe('parsestatus reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ parsing: 0, errors: 0 });
  });

  it('should handle PARSE_REPLAY_ASYNC_DONE', () => {
    const replay = { md5: 'hash1', one: 1 };
    expect(
      reducer({ parsing: 3, errors: 0 }, {
        type: PARSE_REPLAY_ASYNC_DONE,
        payload: {
          index: 0, replay, md5: replay.md5,
        },
      }),
    ).toEqual({ parsing: 2, errors: 0 });
  });

  it('PARSE_REPLAY_ASYNC_PENDING', () => {
    const replay = { md5: 'hash1', one: 1 };

    expect(
      reducer({ parsing: 3, errors: 0 }, {
        type: PARSE_REPLAY_ASYNC_PENDING,
        payload: {
          index: 0, replay, md5: replay.md5,
        },
      }),
    ).toEqual({ parsing: 4, errors: 0 });
  });

  it('should handle PARSE_REPLAY_ASYNC_ERROR', () => {
    expect(
      reducer({ parsing: 3, errors: 0 }, {
        type: PARSE_REPLAY_ASYNC_ERROR,
        payload: {
          err: new Error('Error'),
        },
      }),
    ).toEqual({ parsing: 2, errors: 1 });
  });
});
