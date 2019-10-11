import db, {
  getMatchups,
  getReplays,
  getReplay,
  insertReplay,
  getMaps,
  getReplayCount,
}
  from '../database';

const removeAllDocs = () => db.allDocs({ include_docs: true })
  .then((allDocs) => allDocs.rows.map(
    (row) => ({ _id: row.id, _rev: row.doc._rev, _deleted: true }),
  ))
  .then((deleteDocs) => db.bulkDocs(deleteDocs));


describe('Database tests', () => {
  beforeEach((done) => {
    removeAllDocs().then(() => Promise.all(
      [
        db.put({
          replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: new Date('2018-08-17T18:00:00.000Z'), md5: 'replay1',
        }),
        db.put({
          replay: 2, _id: 'replay2', matchup: 'HvU', insertDate: new Date('2018-08-17T18:01:00.000Z'), md5: 'replay2',
        }),
        db.put({
          replay: 3, _id: 'replay3', matchup: 'HvO', insertDate: new Date('2018-08-17T18:02:00.000Z'), md5: 'replay3',
        }),
      ],
    )
      .then(() => db.createIndex({
        index: {
          fields: ['insertDate', 'md5', 'matchup'],
        },
      }))
      .then(() => done()));
  });
  describe('getReplayCount()', () => {
    it('returns the number of replays in database', (done) => {
      getReplayCount().then((r) => {
        expect(r).toBe(3);
        done();
      });
    });
  });

  describe('getMatchups()', () => {
    it('returns a distinct list of all matchups that exist in database', (done) => {
      getMatchups().then((r) => {
        expect(r).toEqual(['HvO', 'HvU']);
        done();
      });
    });
  });

  describe('getReplays()', () => {
    it('returns all replays that exist in database ordered by insertDate descending', (done) => {
      getReplays(0, 10).then((r) => {
        expect(r).toEqual([
          {
            replay: 3, _id: 'replay3', matchup: 'HvO', insertDate: '2018-08-17T18:02:00.000Z', md5: 'replay3',
          },
          {
            replay: 2, _id: 'replay2', matchup: 'HvU', insertDate: '2018-08-17T18:01:00.000Z', md5: 'replay2',
          },
          {
            replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: '2018-08-17T18:00:00.000Z', md5: 'replay1',
          },

        ]);
        done();
      });
    });

    it('takes perPage and page into account', (done) => {
      Promise.all([
        getReplays(0, 2).then((r) => {
          expect(r).toEqual([
            {
              replay: 3, _id: 'replay3', matchup: 'HvO', insertDate: '2018-08-17T18:02:00.000Z', md5: 'replay3',
            },
            {
              replay: 2, _id: 'replay2', matchup: 'HvU', insertDate: '2018-08-17T18:01:00.000Z', md5: 'replay2',
            }]);
        }),
        getReplays(1, 2).then((r) => {
          expect(r).toEqual([{
            replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: '2018-08-17T18:00:00.000Z', md5: 'replay1',
          }]);
        })])
        .then(() => done());
    });

    it('can filter with specific properties', (done) => {
      getReplays(0, 10, { matchup: 'HvO' }).then((r) => {
        expect(r).toEqual(
          [
            {
              replay: 3, _id: 'replay3', matchup: 'HvO', insertDate: '2018-08-17T18:02:00.000Z', md5: 'replay3',
            },
            {
              replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: '2018-08-17T18:00:00.000Z', md5: 'replay1',
            },
          ],
        );
        done();
      });
    });
  });

  describe('getReplay()', () => {
    it('returns a specific replay by its ID', (done) => {
      getReplay('replay1').then((r) => {
        expect(r).toEqual({
          replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: '2018-08-17T18:00:00.000Z', md5: 'replay1',
        });
        done();
      });
    });
  });

  describe('insertReplay()', () => {
    it('inserts a replay successfully using its md5 as id', (done) => {
      insertReplay({
        md5: 'somemd5', prop1: 'someproperty', matchup: 'HHvOO', insertDate: new Date('2018-08-17T18:00:00.000Z'),
      }).then((r) => {
        expect(r.ok).toBe(true);
        db.get('somemd5').then((result) => {
          expect(result).toEqual(expect.objectContaining({
            _id: 'somemd5', md5: 'somemd5', prop1: 'someproperty', matchup: 'HHvOO', insertDate: '2018-08-17T18:00:00.000Z',
          }));
          done();
        });
      });
    });

    it('if replay with given md5 already exists it will return that replay instead of inserting', (done) => {
      insertReplay({
        md5: 'replay1', prop1: 'someproperty', matchup: 'HHvOO', insertDate: '2018-08-17T18:00:00.000Z',
      }).then((r) => {
        expect(r).toEqual({
          replay: 1, _id: 'replay1', matchup: 'HvO', insertDate: '2018-08-17T18:00:00.000Z', md5: 'replay1',
        });
        db.find({ selector: { md5: { $exists: true } } }).then((d) => {
          expect(d.docs.length).toBe(3);
          done();
        });
      });
    });

    it('rejects if replay to be inserted does not have a md5 property', (done) => {
      insertReplay({ prop1: 'someproperty', matchup: 'HHvOO' }).catch((err) => {
        expect(err).toEqual(new Error('Replay needs a md5 property.'));
        done();
      });
    });
  });
});

describe('Database tests', () => {
  beforeEach((done) => {
    removeAllDocs().then(() => Promise.all(
      [
        db.put({
          replay: 1,
          _id: 'replay1',
          matchup: 'HvO',
          insertDate: new Date('2018-08-17T18:00:00.000Z'),
          md5: 'replay1',
          meta: {
            mapNameCleaned: 'TwistedMeadows.w3x',
          },
        }),
        db.put({
          replay: 2,
          _id: 'replay2',
          matchup: 'HvU',
          insertDate: new Date('2018-08-17T18:01:00.000Z'),
          md5: 'replay2',
          meta: {
            mapNameCleaned: 'TurtleRock.w3x',
          },
        }),
        db.put({
          replay: 3,
          _id: 'replay3',
          matchup: 'HvO',
          insertDate: new Date('2018-08-17T18:02:00.000Z'),
          md5: 'replay3',
          meta: {
            mapNameCleaned: 'TwistedMeadows.w3x',
          },
        }),
        db.put({
          replay: 4,
          _id: 'replay4',
          matchup: 'HvO',
          insertDate: new Date('2018-08-17T18:03:00.000Z'),
          md5: 'replay4',
          meta: {
            mapNameCleaned: 'GnollWood.w3x',
          },
        }),
      ],
    )
      .then(() => db.createIndex({
        index: {
          fields: ['insertDate', 'md5', 'matchup', 'meta.map', 'meta.mapNameCleaned'],
        },
      }))
      .then(() => done()));
  });
  describe('getMaps()', () => {
    it('returns a distinct list of maps that exist in the database', (done) => {
      getMaps().then((r) => {
        expect(r).toEqual(['GnollWood.w3x', 'TurtleRock.w3x', 'TwistedMeadows.w3x']);
        done();
      });
    });
  });
});
