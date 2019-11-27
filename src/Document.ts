import * as t from 'io-ts';
import {CompoundDocument} from './CompoundDocument';
import {DocumentC} from './io/DocumentC';
import {RelationshipsCache} from './RelationshipsCache';

export interface Document extends t.TypeOf<typeof DocumentC> {
}

const fromCompoundDocument = (w: CompoundDocument<unknown>): Document => {
  const [data, relationships] = w();
  const cache = RelationshipsCache.fromRelationships(relationships);
  const included = Object.values(RelationshipsCache.lens.global.get(cache));

  return {
    data,
    ...(included.length > 0 ? {included} : null)
  } as Document;
};

const fromJson = (u: unknown): Document => fromCompoundDocument(
  CompoundDocument.fromJson(u, true)
);

export const Document = {
  fromCompoundDocument: fromCompoundDocument,
  fromJson: fromJson
};
