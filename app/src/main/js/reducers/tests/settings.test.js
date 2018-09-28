/* global describe it expect */
import reducer from '../settings';
import { LOAD_SETTINGS, SAVE_SETTINGS } from '../../actions/settings';

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ wc3FilePath: '', lastReplayDirectory: '' });
  });

  it('should handle LOAD_SETTINGS', () => {
    expect(
      reducer({ wc3FilePath: '' }, {
        type: LOAD_SETTINGS,
        payload: {
          wc3FilePath: '/some/path',
        },
      }),
    ).toEqual({ wc3FilePath: '/some/path' });
  });

  it('should handle SAVE_SETTINGS', () => {
    expect(
      reducer({ wc3FilePath: '' }, {
        type: SAVE_SETTINGS,
        payload: {
          wc3FilePath: '/some/path',
        },
      }),
    ).toEqual({ wc3FilePath: '/some/path' });
  });
});
