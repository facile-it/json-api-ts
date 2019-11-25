import {ResourceIdentifier} from './ResourceIdentifier';

export interface RelationshipsRecord {
  [k: string]: ResourceIdentifier | Array<ResourceIdentifier>
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
