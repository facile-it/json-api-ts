import * as t from 'io-ts';
import {merge} from 'lodash';
import {JsonApiDataC} from './io/JsonApiDataC';
import {ResourceIdentifierC} from './io/ResourceIdentifierC';
import {JsonApiData} from './JsonApiData';
import {Relationships} from './Relationships';
import {ResourceIdentifier} from './ResourceIdentifier';
import {ResourceRecord} from './ResourceRecord';
import {UnknownRecord} from './UnknownRecord';

const fromRelationships = (data: Relationships, resources: ResourceRecord): UnknownRecord =>
  Object.keys(data)
    .reduce(
      (relationships: ResourceRecord, key: string) => {
        const relationship = data[key];
        const strings = key.split('.');

        return merge(
          relationships,
          strings.length > 1
            ? {
              [strings[0]]: fromRelationships(
                {[strings.slice(1).join('.')]: relationship},
                resources
              )
            }
            : {
              [key]: (
                t.array(ResourceIdentifierC).is(relationship.data)
                  ? relationship.data
                    .map(
                      identifier => fromJsonApiData(
                        resources[ResourceIdentifier.iso.string.get(identifier)],
                        resources
                      )
                    )
                  : fromJsonApiData(
                  resources[ResourceIdentifier.iso.string.get(relationship.data)],
                  resources
                  )
              )
            }
        );
      },
      {}
    );

const fromJsonApiData = (data: JsonApiData, resources: ResourceRecord): UnknownRecord =>
  merge(
    {
      ...(
        ResourceIdentifierC.is(data)
          ? {_type: data.type, _id: data.id}
          : null
      ),
      ...data.attributes
    },
    fromRelationships(data.relationships || {}, resources)
  );

const fromJson = (u: unknown, resources: ResourceRecord): unknown =>
  JsonApiDataC.is(u)
    ? fromJsonApiData(u, resources)
    : u;

export const RawData = {
  fromJson: fromJson
};
