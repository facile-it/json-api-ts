import * as t from 'io-ts';
import { Lens } from 'monocle-ts';
import { ResourceC } from './io/ResourceC';
import { ResourceIdentifier } from './ResourceIdentifier';
export interface Resource extends t.TypeOf<typeof ResourceC> {
}
export declare const Resource: {
    lens: {
        identifier: Lens<Resource, ResourceIdentifier>;
    };
};
