import { ResourceIdentifier } from './ResourceIdentifier';
export interface RelationshipsRecord {
    [k: string]: ResourceIdentifier | Array<ResourceIdentifier>;
}
export declare const RelationshipsRecord: {
    nest: (relationships: RelationshipsRecord, key: string) => RelationshipsRecord;
};
