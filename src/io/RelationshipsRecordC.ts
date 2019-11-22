import * as t from 'io-ts';
import {ResourceIdentifierC} from './ResourceIdentifierC';

export const RelationshipsRecordC = t.record(
  t.string,
  t.union([
    ResourceIdentifierC,
    t.array(ResourceIdentifierC)
  ])
);
