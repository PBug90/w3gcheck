/* global describe it expect jest */
import md5 from 'md5';
import configureMockStore from 'redux-mock-store';
import parserPromise from 'AsyncReplayParser';
import thunk from 'redux-thunk';
import {
  parseFiles,
  selectReplay,
  SELECT_REPLAY,
  UPDATE_FILE_LIST,
} from './replaylist';

import {
  PARSE_REPLAY_ASYNC_PENDING,
  PARSE_REPLAY_ASYNC_DONE,
  PARSE_REPLAY_ASYNC_ERROR,
} from './parseReplay';

import {
  loadReplays,
  LOAD_REPLAYS_PENDING,
  LOAD_REPLAYS_DONE,
  LOAD_REPLAYS_ERROR,
} from './loadReplays';

import {
  saveSettings,
  loadSettings,
  SAVE_SETTINGS,
  LOAD_SETTINGS,
} from './settings';

import database from '../database';

const fs = require('fs');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock('../database');
jest.mock('AsyncReplayParser');
jest.mock('md5');
jest.mock('fs');

describe('loadReplays action test', () => {
  it('dispatches LOAD_REPLAYS_PENDING and LOAD_REPLAYS_SUCCESS', (done) => {
    const store = mockStore({});
    const expectedActions = [
      LOAD_REPLAYS_PENDING,
      LOAD_REPLAYS_DONE,
    ];

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);

    store.dispatch(loadReplays())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('dispatches LOAD_REPLAYS_PENDING and LOAD_REPLAYS_ERROR', (done) => {
    const store = mockStore({});
    const expectedActions = [
      LOAD_REPLAYS_PENDING,
      LOAD_REPLAYS_ERROR,
    ];

    database.getReplays.mockImplementation(() => Promise.reject(new Error('Doh')));
    database.getReplayCount.mockResolvedValue(0);

    store.dispatch(loadReplays())
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });
});

describe('selectReplay action test', () => {
  it('dispatches SELECT_REPLAY and push("/replay") to change view', () => {
    const store = mockStore({});
    const expectedActions = [
      SELECT_REPLAY,
      '@@router/CALL_HISTORY_METHOD',
    ];

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);

    store.dispatch(selectReplay('somestring'));

    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });
});

describe('parseFiles action test', () => {
  it('dispatches UPDATE_FILE_LIST', () => {
    const store = mockStore({ fileList: [] });
    const expectedActions = [
      UPDATE_FILE_LIST,
    ];

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);

    store.dispatch(parseFiles(['somepath']));

    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });

  it('dispatches UPDATE_FILE_LIST and limits number of files to the first 25 selected', () => {
    const store = mockStore({ fileList: [] });
    const payload = Array.from({ length: 30 }, (v, k) => `${k + 1}`);
    const expectedAction = {
      type: UPDATE_FILE_LIST,
      payload: payload.slice(0, 25),
    };

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);

    store.dispatch(parseFiles(payload));
    const actualAction = store.getActions()[0];
    expect(actualAction).toEqual(expectedAction);
  });

  it('dispatches PARSE_REPLAY_ASYNC_PENDING for each given file', () => {
    const store = mockStore({ fileList: ['file1', 'file2'] });
    const expectedActions = [
      UPDATE_FILE_LIST,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_PENDING,
    ];

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);
    database.getReplay.mockResolvedValue({});
    md5.mockReturnValue('thisisamd5hash');
    store.dispatch(parseFiles(['somepath']));

    const actualActions = store.getActions().map(action => action.type);
    expect(actualActions).toEqual(expectedActions);
  });


  it('dispatches PARSE_REPLAY_ASYNC_DONE for each given file', (done) => {
    const store = mockStore({ fileList: ['file1', 'file2'] });
    const expectedActions = [
      UPDATE_FILE_LIST,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_DONE,
      PARSE_REPLAY_ASYNC_DONE,
    ];

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);
    database.getReplay.mockResolvedValue({ md5: 'somereplaymd5', teams: [] });
    fs.readFile.mockImplementation((path, callback) => callback());
    md5.mockReturnValue('thisisamd5hash');
    store.dispatch(parseFiles(['somepath', 'somepath2']))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('uses database entry if md5 exists in db', (done) => {
    const store = mockStore({ fileList: ['file1', 'file2'] });
    const expectedActions = [
      UPDATE_FILE_LIST,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_DONE,
      PARSE_REPLAY_ASYNC_DONE,
    ];

    const dummyReplayParsed = { md5: 'notmyhash', teams: [], meta: { mapName: '' } };

    database.getReplays.mockResolvedValue([]);
    database.getReplayCount.mockResolvedValue(0);
    database.getReplay.mockResolvedValueOnce({ md5: 'myhash', teams: [] });
    database.getReplay.mockResolvedValue(null);
    database.insertReplay.mockResolvedValue(dummyReplayParsed);
    parserPromise.mockResolvedValue(dummyReplayParsed);

    md5.mockReturnValueOnce('myhash');
    md5.mockReturnValue('notmyhash');

    store.dispatch(parseFiles(['somepath', 'somepath2']))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });

  it('dispatches PARSE_REPLAY_ASYNC_ERROR if parsing fails', (done) => {
    const store = mockStore({ fileList: ['file1'] });
    const expectedActions = [
      UPDATE_FILE_LIST,
      PARSE_REPLAY_ASYNC_PENDING,
      PARSE_REPLAY_ASYNC_ERROR,
    ];

    database.getReplay.mockRejectedValueOnce(null);
    parserPromise.mockResolvedValue(Promise.reject(new Error('Doh!')));

    store.dispatch(parseFiles(['somepath']))
      .then(() => {
        const actualActions = store.getActions().map(action => action.type);
        expect(actualActions).toEqual(expectedActions);
        done();
      });
  });
});


describe('saveSettings action test', () => {
  it('dispatches SAVE_SETTINGS with given payload', () => {
    const store = mockStore({ settings: {} });
    const expectedActions = [
      {
        type: SAVE_SETTINGS,
        payload: { somesetting: 123, someOtherSetting: '/a/path/' },
      },
    ];

    store.dispatch(saveSettings({ somesetting: 123, someOtherSetting: '/a/path/' }));

    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });
});

describe('loadSettings action test', () => {
  it('dispatches LOAD_SETTINGS with given payload', () => {
    fs.readFileSync = jest.fn().mockReturnValue('{"somesetting": 123, "someOtherSetting": "/a/path/" }');

    const store = mockStore({ settings: {} });
    const expectedActions = [
      {
        type: LOAD_SETTINGS,
        payload: { somesetting: 123, someOtherSetting: '/a/path/' },
      },
    ];

    store.dispatch(loadSettings());

    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });

  it('handles an error in fs.readFileSync and returns an empty object {}', () => {
    fs.readFileSync = jest.fn().mockImplementation(() => {
      throw new Error('Read error.');
    });

    const store = mockStore({ settings: {} });
    const expectedActions = [
      {
        type: LOAD_SETTINGS,
        payload: {},
      },
    ];

    store.dispatch(loadSettings());

    const actualActions = store.getActions();
    expect(actualActions).toEqual(expectedActions);
  });
});
