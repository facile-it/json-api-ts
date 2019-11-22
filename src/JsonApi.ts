import * as t from 'io-ts';
import {CompoundDocument} from './CompoundDocument';
import {JsonApiC} from './io/JsonApiC';
import {RelationshipsCache} from './RelationshipsCache';

export interface JsonApi extends t.TypeOf<typeof JsonApiC> {
}

export const JsonApi = {
  fromJson: (u: unknown): JsonApi => {
    const [data, relationships] = CompoundDocument.fromJson(u, true)();
    const included = Object.values(
      RelationshipsCache.lens.global.get(
        RelationshipsCache.fromRelationships(relationships)
      )
    );

    return {
      data,
      ...(included.length > 0 ? {included} : null)
    } as JsonApi;
  }
};
