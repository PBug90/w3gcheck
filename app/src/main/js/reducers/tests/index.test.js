/* global describe it expect */
import { createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import reducer from '../index';
import fileListReducer from '../fileList';
import paginationReducer from '../pagination';
import parsedReplaysReducer from '../parsedReplays';
import parsestatusReducer from '../parsestatus';
import replaysReducer from '../replays';
import selectReplayReducer from '../selectReplay';

const store = createStore(reducer);
describe('initial reducer test', () => {
  it('store has all the required sub keys', () => {
    expect(store.getState().fileList).toEqual(fileListReducer(undefined, {}));
    expect(store.getState().pagination).toEqual(paginationReducer(undefined, {}));
    expect(store.getState().parsed).toEqual(parsedReplaysReducer(undefined, {}));
    expect(store.getState().parsestatus).toEqual(parsestatusReducer(undefined, {}));
    expect(store.getState().replays).toEqual(replaysReducer(undefined, {}));
    expect(store.getState().selected).toEqual(selectReplayReducer(undefined, {}));
    expect(store.getState().router).toEqual(routerReducer(undefined, {}));
  });
});
