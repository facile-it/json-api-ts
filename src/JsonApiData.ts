import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {ArrayC} from './io/ArrayC';
import {EntityC} from './io/EntityC';
import {JsonApiDataC} from './io/JsonApiDataC';
import {Relationships} from './Relationships';
import {RelationshipsRecord} from './RelationshipsRecord';
import {Resource} from './Resource';
import {ResourceIdentifier} from './ResourceIdentifier';
import {UnknownRecord} from './UnknownRecord';

export interface JsonApiData extends t.TypeOf<typeof JsonApiDataC> {
}

const fromRecord = ({_type, _id, ...attributes}: UnknownRecord, relationships: RelationshipsRecord): JsonApiData =>
  ({
    ...(
      EntityC.is({_type, _id})
        ? {
          type: '' + _type as NonEmptyString,
          id: '' + _id as NonEmptyString
        }
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
              (carry: Relationships, key: string): Relationships => {
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

export const JsonApiData = {
  fromJson: fromJson
};
