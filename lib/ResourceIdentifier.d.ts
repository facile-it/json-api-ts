import * as t from 'io-ts';
import { Iso } from 'monocle-ts';
import { ResourceIdentifierC } from './io/ResourceIdentifierC';
export interface ResourceIdentifier extends t.TypeOf<typeof ResourceIdentifierC> {
}
export declare const ResourceIdentifier: {
    iso: {
        string: Iso<ResourceIdentifier, string>;
    };
};
