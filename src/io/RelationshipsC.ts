import * as t from 'io-ts';
import {DataWrappedC} from './DataWrappedC';
import {ResourceIdentifierC} from './ResourceIdentifierC';

export const RelationshipsC = t.record(
  t.string,
  DataWrappedC(
    t.union([
      ResourceIdentifierC,
      t.array(ResourceIdentifierC)
    ])
  )
);
