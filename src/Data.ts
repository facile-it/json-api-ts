import * as t from 'io-ts';
import {ArrayC} from './io/ArrayC';
import {DataC} from './io/DataC';
import {EntityC} from './io/EntityC';
import {Relationships} from './Relationships';
import {RelationshipsRecord} from './RelationshipsRecord';
import {Resource} from './Resource';
import {ResourceIdentifier} from './ResourceIdentifier';
import {UnknownRecord} from './UnknownRecord';

export interface Data extends t.TypeOf<typeof DataC> {
}

const fromRecord = ({_type, _id, ...attributes}: UnknownRecord, relationships: RelationshipsRecord): Data =>
  ({
    ...(
      EntityC.is({_type, _id})
        ? {type: '' + _type, id: '' + _id}
        : null
    ),
    ...(
      Object.keys(attributes).length > 0
        ? {attributes}
        : null
    ),
    ...(
      Object.keys(relationships).length > 0
        ? {
          relationships: Object.keys(relationships)
            .reduce(
              (carry: Relationships, key: keyof Relationships): Relationships => {
                const resource = relationships[key];

                return {
                  ...carry,
                  [key]: {
                    data: ArrayC<ResourceIdentifier>().is(resource)
                      ? resource.map(Resource.lens.identifier.get)
                      : Resource.lens.identifier.get(resource)
                  }
                };
              },
              {}
            )
        }
        : null
    )
  });

const fromJson = (u: unknown, relationships: RelationshipsRecord): unknown =>
  t.UnknownRecord.is(u)
    ? fromRecord(u, relationships)
    : u;

export const Data = {
  fromRecord: fromRecord,
  fromJson: fromJson
};
