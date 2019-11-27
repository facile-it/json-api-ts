import * as t from 'io-ts';
import {RelationshipsRecordC} from './RelationshipsRecordC';

export const RelationshipsCacheC = t.tuple([
  t.number,
  RelationshipsRecordC,
  RelationshipsRecordC
]);
