import { Resource } from './Resource';
export interface ResourceRecord extends Record<string, Resource> {
}
export declare const ResourceRecord: {
    fromResources: (resources: Resource[]) => ResourceRecord;
};
