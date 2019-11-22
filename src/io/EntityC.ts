import * as t from 'io-ts';

export const EntityC = t.type({
  _type: t.string,
  _id: t.union([t.number, t.string])
});
