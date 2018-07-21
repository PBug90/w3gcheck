const path = require('path');
const os = require('os');
const FileASync = require('lowdb/adapters/FileAsync');


const dbPath = path.join(os.homedir(), 'db.json');
const adapter = new FileASync(dbPath);
const db = require('lowdb')(adapter);

let dbInstance = null;
db.then((dbInst) => {
  dbInstance = dbInst;
  dbInstance.defaults({ replays: {}, user: {}, replayCount: 0 })
    .write();
});


module.exports = {
  getReplays(page, perPage) {
    if (!dbInstance) {
      return db.then(() => dbInstance).then(() =>
        dbInstance.get('replays').sortBy('insertDate')
          .slice(perPage * (page - 1), perPage * page).value());
    }

    return Promise.resolve(dbInstance.get('replays').sortBy('insertDate')
      .slice(perPage * (page - 1), perPage * page).value());
  },

  getReplayCount() {
    return Promise.resolve(dbInstance.get('replayCount').value());
  },
  insertReplay(replay) {
    if (!replay.md5) { throw new Error('replay needs a md5 property.'); }
    return db.then(() => dbInstance).then(() => {
      dbInstance.update('replayCount', n => n + 1)
        .write();
      return dbInstance.set(`replays.${replay.md5}`, replay).write();
    });
  },
  getReplay(md5) {
    return Promise.resolve(dbInstance.get('replays')
      .find({ md5 })
      .value());
  },
};
