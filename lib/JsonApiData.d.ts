import * as t from 'io-ts';
import { JsonApiDataC } from './io/JsonApiDataC';
import { RelationshipsRecord } from './RelationshipsRecord';
export interface JsonApiData extends t.TypeOf<typeof JsonApiDataC> {
}
export declare const JsonApiData: {
    fromJson: (u: unknown, relationships: RelationshipsRecord) => unknown;
};
