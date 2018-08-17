/* global describe it expect jest */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../database';

import {
  SAVE_REPLAY_ASYNC_DONE,
  SAVE_REPLAY_ASYNC_PENDING,
  SAVE_REPLAY_ASYNC_ERROR,
  saveReplay,
} from '../saveReplay';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../database');

describe('saveReplay action test', () => {
  it('dispatches SAVE_REPLAY_ASYNC_PENDING and SAVE_REPLAY_ASYNC_DONE', (done) => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: SAVE_REPLAY_ASYNC_PENDING,
        payload: { md5: 'somemd5', filepath: '/some/path/' },
      },
      {
        type: SAVE_REPLAY_ASYNC_DONE,
        payload: { inserted: { md5: 'somemd5', filepath: '/some/path/' }, fileIndex: 0 },
      },
    ];
    database.insertReplay.mockResolvedValue({ md5: 'somemd5', filepath: '/some/path/' });
    store.dispatch(saveReplay({ md5: 'somemd5', filepath: '/some/path/' }, 0))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('dispatches SAVE_REPLAY_ASYNC_PENDING and SAVE_REPLAY_ASYNC_ERROR if database saving fails', (done) => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: SAVE_REPLAY_ASYNC_PENDING,
        payload: { md5: 'somemd5', filepath: '/some/path/' },
      },
      {
        type: SAVE_REPLAY_ASYNC_ERROR,
        payload: { err: new Error('A database error occured!'), fileIndex: 0 },
      },
    ];
    database.insertReplay.mockRejectedValue(new Error('A database error occured!'));
    store.dispatch(saveReplay({ md5: 'somemd5', filepath: '/some/path/' }, 0))
      .then(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('dispatches SAVE_REPLAY_ASYNC_ERROR if replay has no md5 property', () => {
    const store = mockStore({});
    const expectedAction =
      {
        type: SAVE_REPLAY_ASYNC_ERROR,
        payload: new Error('No md5 property!'),
      };

    store.dispatch(saveReplay({ filepath: '/some/path/' }, 0));

    const actualActions = store.getActions();
    expect(actualActions[1]).toEqual(expectedAction);
  });

  it('dispatches SAVE_REPLAY_ASYNC_ERROR if replay has no filepath property', () => {
    const store = mockStore({});
    const expectedAction =
      {
        type: SAVE_REPLAY_ASYNC_ERROR,
        payload: new Error('No filepath property!'),
      };

    store.dispatch(saveReplay({ md5: 'somemd5' }, 0));
    const actualActions = store.getActions();
    expect(actualActions[1]).toEqual(expectedAction);
  });
});
