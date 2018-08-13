/* global describe it expect */
import reducer from '../parsedReplays';
import { LOAD_REPLAYS_DONE } from '../../actions/loadReplays';
import { PARSE_REPLAY_ASYNC_DONE } from '../../actions/parseReplay';

describe('parsedReplays reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ });
  });

  it('should handle LOAD_REPLAYS_DONE', () => {
    const page = 1;
    const perPage = 15;
    const replays = [{ md5: 'hash1', one: 1 }, { md5: 'hash2', two: 2 }];
    const totalPages = 1;

    expect(
      reducer({}, {
        type: LOAD_REPLAYS_DONE,
        payload: {
          page, perPage, replays, totalPages,
        },
      }),
    ).toEqual({ hash1: replays[0], hash2: replays[1] });
  });

  it('LOAD_REPLAYS_DONE updates state with new replay and keeps old entries', () => {
    const page = 1;
    const perPage = 15;
    const totalPages = 1;
    const otherReplay = { md5: 'othermd5', three: 3 };
    const replays = [{ md5: 'hash1', one: 1 }, { md5: 'hash2', two: 2 }];
    expect(
      reducer({ othermd5: otherReplay }, {
        type: LOAD_REPLAYS_DONE,
        payload: {
          page, perPage, replays, totalPages,
        },
      }),

    ).toEqual({
      [replays[0].md5]: replays[0],
      [replays[1].md5]: replays[1],
      othermd5: otherReplay,
    });
  });

  it('should handle PARSE_REPLAY_ASYNC_DONE', () => {
    const replay = { md5: 'hash2', two: 2 };

    expect(
      reducer({}, {
        type: PARSE_REPLAY_ASYNC_DONE,
        payload: {
          index: -1, replay, md5: replay.md5,
        },
      }),
    ).toEqual({ [replay.md5]: replay });
  });

  it('PARSE_REPLAY_ASYNC_DONE updates state with new replay and keeps old entries', () => {
    const replay = { md5: 'hash2', two: 2 };

    expect(
      reducer({ othermd5: { md5: 'othermd5', three: 1 } }, {
        type: PARSE_REPLAY_ASYNC_DONE,
        payload: {
          index: -1, replay, md5: replay.md5,
        },
      }),
    ).toEqual({ [replay.md5]: replay, othermd5: { md5: 'othermd5', three: 1 } });
  });
});
