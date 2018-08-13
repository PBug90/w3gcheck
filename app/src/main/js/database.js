const Datastore = require('nedb');

const db = new Datastore({ filename: 'w3gcheck.db' });

db.loadDatabase();


const getReplays = (page, perPage, filter = {}) => new Promise((resolve, reject) => {
  db.find(filter).sort({ insertDate: -1 }).skip(perPage * (page - 1)).limit(perPage)
    .exec((err, docs) => (err ? reject(err) : resolve(docs)));
});

const getReplayCount = () => new Promise((resolve, reject) => {
  db.count({}, (err, docs) => (err ? reject(err) : resolve(docs)));
});

const getReplay = md5 => new Promise((resolve, reject) =>
  db.findOne({ md5 }, (err, doc) => (err ? reject(err) : resolve(doc))));

const insertReplay = (replay) => {
  if (!replay.md5) { return Promise.reject(new Error('replay needs a md5 property.')); }
  return getReplay(replay.md5).then((doc) => {
    if (!doc) {
      return new Promise((resolve, reject) => {
        db.insert(replay, (err, insertedDoc) =>
          (err ?
            reject(err) :
            resolve(insertedDoc)));
      });
    }
    return Promise.resolve(doc);
  });
};

module.exports = {
  getReplays,
  getReplay,
  insertReplay,
  getReplayCount,
};
