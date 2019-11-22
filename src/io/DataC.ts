import * as t from 'io-ts';
import {AttributesC} from './AttributesC';
import {RelationshipsC} from './RelationshipsC';

export const DataC = t.partial({
  type: t.string,
  id: t.string,
  attributes: AttributesC,
  relationships: RelationshipsC
});
