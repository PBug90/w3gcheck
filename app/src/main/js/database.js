import find from 'pouchdb-find';
import PouchDB from './PouchDBProvider';

PouchDB.plugin(find);

const db = new PouchDB('./replays');

const getReplays = (page, perPage, filter = {}) =>
  db.find({ selector: filter, limit: perPage, skip: (page - 1) * perPage })
    .then(r => r.docs.map((d) => {
      delete d._rev;
      return d;
    }));

/* istanbul ignore next */
const matchupMapReduce = {
  map: (doc) => {
    if (doc.matchup) {
      emit(doc.matchup, 1); //eslint-disable-line
    }
  },
  reduce: () => true,
};

const getReplayCount = () => db.allDocs().then(e => e.rows.length);

const getMatchups = () => db.query(matchupMapReduce, {
  group: true,
}).then(result => result.rows.map(r => r.key));

const getReplay = md5 => db.get(md5).then((r) => {
  delete r._rev;
  return r;
});

const insertReplay = (replay) => {
  if (!replay.md5) { return Promise.reject(new Error('Replay needs a md5 property.')); }
  return getReplay(replay.md5).then(doc => Promise.resolve(doc))
    .catch(() => db.put({ ...replay, _id: replay.md5 }));
};

module.exports = {
  db,
  getMatchups,
  getReplays,
  getReplay,
  insertReplay,
  getReplayCount,
};
