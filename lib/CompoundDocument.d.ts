import { Writer } from 'fp-ts/lib/Writer';
import { RelationshipsCache } from './RelationshipsCache';
import { RelationshipsRecord } from './RelationshipsRecord';
import { UnknownRecord } from './UnknownRecord';
export declare type CompoundDocument<A> = Writer<RelationshipsCache | RelationshipsRecord, A>;
export declare const CompoundDocument: {
    fromArray: (u: unknown[]) => CompoundDocument<unknown[]>;
    fromJson: (u: unknown, primaryData?: boolean) => CompoundDocument<unknown>;
    fromRecord: (u: UnknownRecord) => CompoundDocument<UnknownRecord>;
    fromUnknown: (u: unknown) => CompoundDocument<unknown>;
};
