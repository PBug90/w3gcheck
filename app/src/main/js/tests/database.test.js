import {
  getMatchups,
  getReplays,
  getReplay,
  insertReplay,
  getReplayCount,
  db,
}
  from '../database';

const removeAllDocs = () =>
  db.allDocs({ include_docs: true })
    .then(allDocs => allDocs.rows.map(row => ({ _id: row.id, _rev: row.doc._rev, _deleted: true })))
    .then(deleteDocs => db.bulkDocs(deleteDocs));


describe('Database tests', () => {
  beforeEach((done) => {
    removeAllDocs().then(() =>
      Promise.all(
        [
          db.put({ replay: 1, _id: 'replay1', matchup: 'HvO' }),
          db.put({ replay: 2, _id: 'replay2', matchup: 'HvU' }),
          db.put({ replay: 3, _id: 'replay3', matchup: 'HvO' }),
        ],
      ).then(() => done()));
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
    it('returns all replays that exist in database', (done) => {
      getReplays(1, 10).then((r) => {
        expect(r).toEqual([{ replay: 1, _id: 'replay1', matchup: 'HvO' },
          { replay: 2, _id: 'replay2', matchup: 'HvU' },
          { replay: 3, _id: 'replay3', matchup: 'HvO' }]);
        done();
      });
    });

    it('takes perPage and page into account', (done) => {
      Promise.all([
        getReplays(1, 2).then((r) => {
          expect(r).toEqual([{ replay: 1, _id: 'replay1', matchup: 'HvO' },
            { replay: 2, _id: 'replay2', matchup: 'HvU' }]);
        }),
        getReplays(2, 2).then((r) => {
          expect(r).toEqual([{ replay: 3, _id: 'replay3', matchup: 'HvO' }]);
        })])
        .then(() => done());
    });

    it('can filter with specific properties', (done) => {
      getReplays(1, 10, { matchup: 'HvO' }).then((r) => {
        expect(r).toEqual(
          [
            { replay: 1, _id: 'replay1', matchup: 'HvO' },
            { replay: 3, _id: 'replay3', matchup: 'HvO' },
          ],
        );
        done();
      });
    });
  });

  describe('getReplay()', () => {
    it('returns a specific replay by its ID', (done) => {
      getReplay('replay1').then((r) => {
        expect(r).toEqual({ replay: 1, _id: 'replay1', matchup: 'HvO' });
        done();
      });
    });
  });

  describe('insertReplay()', () => {
    it('inserts a replay successfully using its md5 as id', (done) => {
      insertReplay({ md5: 'somemd5', prop1: 'someproperty', matchup: 'HHvOO' }).then((r) => {
        expect(r.ok).toBe(true);
        db.get('somemd5').then((result) => {
          expect(result).toEqual(expect.objectContaining({
            _id: 'somemd5', md5: 'somemd5', prop1: 'someproperty', matchup: 'HHvOO',
          }));
          done();
        });
      });
    });

    it('if replay with given md5 already exists it will return that replay instead of inserting', (done) => {
      insertReplay({ md5: 'replay1', prop1: 'someproperty', matchup: 'HHvOO' }).then((r) => {
        expect(r).toEqual({ replay: 1, _id: 'replay1', matchup: 'HvO' });
        db.allDocs({ include_docs: true }).then((d) => {
          expect(d.rows.length).toBe(3);
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
