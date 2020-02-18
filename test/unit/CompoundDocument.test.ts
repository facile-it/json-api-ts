import {expect} from 'chai';
import {getMonad} from 'fp-ts/lib/Writer';
import 'mocha';
import {CompoundDocument} from '../../src/CompoundDocument';
import {RelationshipsCache} from '../../src/RelationshipsCache';
import {UnknownRecord} from '../../src/UnknownRecord';

const m = getMonad(RelationshipsCache.monoid.self);
const g = (u: unknown) => m.of(u)();

describe('CompoundDocument', () => {
  describe('fromRecord', () => {
    const f = (u: UnknownRecord) => CompoundDocument.fromRecord(u)();

    it('should return the record itself without nested entities', () => {
      expect(f({})).to.deep.equal(g({}));
      expect(f({a: 1, b: {c: 1}, d: []})).to.deep.equal(g({a: 1, b: {c: 1}, d: []}));
      expect(f({_type: 'a', _id: 1})).to.deep.equal(g({_type: 'a', _id: 1}));
    });

    it('should return a JSON:API-like record with nested entities', () => {
      const a1 = {type: 'a', id: '1'};
      expect(f({a: {_type: 'a', _id: 1}}))
        .to.deep.equal([{}, [1, {'a:1': a1}, {a: a1}]]);
      expect(f({a: {b: {_type: 'a', _id: 1}}}))
        .to.deep.equal([{a: {}}, [1, {'a:1': a1}, {'a.b': a1}]]);

      const b1 = {type: 'b', id: '1'};
      const a2 = {type: 'a', id: '2', relationships: {b: {data: b1}}};
      expect(f({a: {_type: 'a', _id: 2, b: {_type: 'b', _id: 1}}}))
        .to.deep.equal([{}, [2, {'a:2': a2, 'b:1': b1}, {a: a2}]]);
    });

    it('should return a JSON:API-like record with nested arrays of entities (#4)', () => {
      const b1 = {type: 'b', id: '1'};
      const b2 = {type: 'b', id: '2'};
      const a1 = {type: 'a', id: '1', relationships: {b: {data: [b1, b2]}}};
      expect(f({a: {_type: 'a', _id: 1, b: [{_type: 'b', _id: 1}, {_type: 'b', _id: 2}]}}))
        .to.deep.equal([{}, [3, {'a:1': a1, 'b:1': b1, 'b:2': b2}, {a: a1}]]);
    });
  });

  describe('fromUnknown', () => {
    it('should return the argument itself', () => {
      const f = (u: unknown) => CompoundDocument.fromUnknown(u)();

      expect(f(false)).to.deep.equal(g(false));
      expect(f(0)).to.deep.equal(g(0));
      expect(f('')).to.deep.equal(g(''));
      expect(f({})).to.deep.equal(g({}));
      expect(f([])).to.deep.equal(g([]));
    });
  });
});
