import { Writer } from 'fp-ts/lib/Writer';
import { RelationshipsCache } from './RelationshipsCache';
import { RelationshipsRecord } from './RelationshipsRecord';
export declare type CompoundDocument<A> = Writer<RelationshipsCache | RelationshipsRecord, A>;
export declare const CompoundDocument: {
    fromJson: (u: unknown, primaryData?: boolean) => CompoundDocument<unknown>;
};
