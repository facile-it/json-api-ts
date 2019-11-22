import * as t from 'io-ts';
import {Lens} from 'monocle-ts';
import {ResourceC} from './io/ResourceC';
import {ResourceIdentifier} from './ResourceIdentifier';

export interface Resource extends t.TypeOf<typeof ResourceC> {
}

export const Resource = {
  lens: {
    identifier: new Lens<Resource, ResourceIdentifier>(
      s => ({
        type: ResourceIdentifier.lens.type.get(s),
        id: ResourceIdentifier.lens.id.get(s)
      }),
      a => s => ({
        ...s,
        type: ResourceIdentifier.lens.type.get(a),
        id: ResourceIdentifier.lens.id.get(a)
      })
    )
  }
};
