import { Monoid } from 'fp-ts/lib/Monoid';
import * as t from 'io-ts';
import { Lens } from 'monocle-ts';
import { RelationshipsCacheC } from './io/RelationshipsCacheC';
import { RelationshipsRecord } from './RelationshipsRecord';
export interface RelationshipsCache extends t.TypeOf<typeof RelationshipsCacheC> {
}
export declare const RelationshipsCache: {
    fromRelationships: (x: RelationshipsRecord | RelationshipsCache) => RelationshipsCache;
    emptyLocal: (cache: RelationshipsRecord | RelationshipsCache) => RelationshipsCache;
    nestLocal: (cache: RelationshipsRecord | RelationshipsCache, key: string) => RelationshipsCache;
    lens: {
        counter: Lens<RelationshipsCache, number>;
        global: Lens<RelationshipsCache, RelationshipsRecord>;
        local: Lens<RelationshipsCache, RelationshipsRecord>;
    };
    monoid: {
        self: Monoid<RelationshipsRecord | RelationshipsCache>;
    };
};
