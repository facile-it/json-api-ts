import { ResourceIdentifier } from './ResourceIdentifier';
export interface Relationships {
    [k: string]: {
        data: ResourceIdentifier | Array<ResourceIdentifier>;
    };
}
