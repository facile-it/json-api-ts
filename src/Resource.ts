import * as t from 'io-ts';
import {Lens} from 'monocle-ts';
import {ResourceC} from './io/ResourceC';
import {ResourceIdentifier} from './ResourceIdentifier';

export interface Resource extends t.TypeOf<typeof ResourceC> {
}

export const Resource = {
  lens: {
    identifier: new Lens<Resource, ResourceIdentifier>(
      ({type, id, ..._}) => ({type, id}),
      ({type, id, ..._}) => s => ({...s, type, id})
    )
  }
};
