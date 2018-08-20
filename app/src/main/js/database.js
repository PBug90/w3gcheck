import find from 'pouchdb-find';
import PouchDB from './PouchDBProvider';

PouchDB.plugin(find);

const db = new PouchDB('./replays');

db.createIndex({
  index: {
    fields: ['insertDate', 'md5', 'matchup', 'meta.map', 'meta.mapNameCleaned'],
  },
});


const getReplays = (page, perPage, filter = {}) => {
  const filterMerged = {
    $and: [
      { insertDate: { $gt: true } },
      { md5: { $exists: true } },
      filter],
  };
  return db.find({
    selector: filterMerged, limit: perPage, skip: (page - 1) * perPage, sort: [{ insertDate: 'desc' }],
  })
    .then(r => r.docs.map((d) => {
      delete d._rev;
      return d;
    }));
};
/* istanbul ignore next */
const matchupMapReduce = {
  map: (doc) => {
    if (doc.matchup) {
      emit(doc.matchup, 1); //eslint-disable-line
    }
  },
  reduce: () => true,
};

/* istanbul ignore next */
const mapMapReduce = {
  map: (doc) => {
    if (doc.meta.mapNameCleaned) {
      emit(doc.meta.mapNameCleaned, 1); //eslint-disable-line
    }
  },
  reduce: () => true,
};

const getReplayCount = () => db.find({ fields: ['_id', 'md5'], selector: { md5: { $exists: true } } }).then(e => e.docs.length);

const getMatchups = () => db.query(matchupMapReduce, {
  group: true,
}).then(result => result.rows.map(r => r.key));

const getMaps = () => db.query(mapMapReduce, {
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
  getMaps,
  getMatchups,
  getReplays,
  getReplay,
  insertReplay,
  getReplayCount,
};
