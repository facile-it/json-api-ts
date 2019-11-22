import * as t from 'io-ts';
import {AttributesC} from './AttributesC';
import {RelationshipsC} from './RelationshipsC';
import {ResourceIdentifierC} from './ResourceIdentifierC';

export const ResourceC = t.intersection([
  ResourceIdentifierC,
  t.partial({
    attributes: AttributesC,
    relationships: RelationshipsC
  })
]);
