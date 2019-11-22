import * as t from 'io-ts';
import {ResourceIdentifierC} from './ResourceIdentifierC';

export const RelationshipsC = t.record(
  t.string,
  t.type({
    data: t.union([
      ResourceIdentifierC,
      t.array(ResourceIdentifierC)
    ])
  })
);
