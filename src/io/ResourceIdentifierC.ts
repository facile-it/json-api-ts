import * as t from 'io-ts';

export const ResourceIdentifierC = t.type({
  type: t.string,
  id: t.string
});
