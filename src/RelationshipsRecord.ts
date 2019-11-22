import * as t from 'io-ts';
import {RelationshipsRecordC} from './io/RelationshipsRecordC';

export interface RelationshipsRecord extends t.TypeOf<typeof RelationshipsRecordC> {
}

export const RelationshipsRecord = {
  nest: (relationships: RelationshipsRecord, key: string): RelationshipsRecord =>
    Object.keys(relationships)
      .reduce(
        (record: RelationshipsRecord, k: string): RelationshipsRecord => ({
          ...record,
          [`${key}.${k}`]: relationships[k]
        }),
        {}
      )
};
