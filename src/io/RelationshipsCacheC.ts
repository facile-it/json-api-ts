import * as t from 'io-ts';
import {RelationshipsRecordC} from './RelationshipsRecordC';

export const RelationshipsCacheC = t.tuple([
  RelationshipsRecordC,
  RelationshipsRecordC
]);
