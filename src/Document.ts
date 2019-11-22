import * as t from 'io-ts';
import {CompoundDocument} from './CompoundDocument';
import {DocumentC} from './io/DocumentC';
import {RelationshipsCache} from './RelationshipsCache';

export interface Document extends t.TypeOf<typeof DocumentC> {
}

export const Document = {
  fromJson: (u: unknown): Document => {
    const [data, relationships] = CompoundDocument.fromJson(u, true)();
    const included = Object.values(
      RelationshipsCache.lens.global.get(
        RelationshipsCache.fromRelationships(relationships)
      )
    );

    return {
      data,
      ...(included.length > 0 ? {included} : null)
    } as Document;
  }
};
