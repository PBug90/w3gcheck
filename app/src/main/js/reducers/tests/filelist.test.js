/* global describe it expect jest */
import reducer from '../fileList';
import { UPDATE_FILE_LIST } from '../../actions/replaylist';
import {
  PARSE_REPLAY_ASYNC_DONE,
  PARSE_REPLAY_ASYNC_PENDING,
  PARSE_REPLAY_ASYNC_ERROR,
}
  from '../../actions/parseReplay';

import { SAVE_REPLAY_ASYNC_DONE }
  from '../../actions/saveReplay';

jest.mock('AsyncReplayParser');


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

  // index, replay: replayParsed, md5: replayParsed.md5, fromDB: false,
  it('should handle PARSE_REPLAY_ASYNC_DONE', () => {
    const baseState = [
      {
        base: 'filepath1', path: 'filepath1', pending: false, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ];
    expect(
      reducer(baseState, {
        type: PARSE_REPLAY_ASYNC_DONE,
        payload: {
          index: 0, md5: 'somemd5hash', fromDB: false, replay: { prop: 1 },
        },
      }),
    ).toEqual([
      {
        md5: 'somemd5hash', base: 'filepath1', path: 'filepath1', pending: false, finished: false, fromDB: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ]);
  });

  it('should handle PARSE_REPLAY_ASYNC_PENDING', () => {
    const baseState = [
      {
        base: 'filepath1', path: 'filepath1', pending: false, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ];
    expect(
      reducer(baseState, {
        type: PARSE_REPLAY_ASYNC_PENDING,
        payload: 0,
      }),
    ).toEqual([
      {
        base: 'filepath1', path: 'filepath1', pending: true, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ]);
  });

  it('should handle PARSE_REPLAY_ASYNC_ERROR', () => {
    const baseState = [
      {
        base: 'filepath1', path: 'filepath1', pending: true, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ];
    expect(
      reducer(baseState, {
        type: PARSE_REPLAY_ASYNC_ERROR,
        payload: 0,
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

  it('should handle SAVE_REPLAY_ASYNC_DONE', () => {
    const baseState = [
      {
        base: 'filepath1', path: 'filepath1', pending: true, finished: false,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ];
    expect(
      reducer(baseState, {
        type: SAVE_REPLAY_ASYNC_DONE,
        payload: { inserted: { md5: 'somemd5', filepath: '/some/path/' }, fileIndex: 0 },
      }),
    ).toEqual([
      {
        base: 'filepath1', path: 'filepath1', pending: false, finished: false, fromDB: true,
      },
      {
        base: 'filepath2', path: 'filepath2', pending: false, finished: false,
      },
    ]);
  });
});
