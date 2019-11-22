import * as t from 'io-ts';
import {Iso, Lens} from 'monocle-ts';
import {ResourceIdentifierC} from './io/ResourceIdentifierC';

export interface ResourceIdentifier extends t.TypeOf<typeof ResourceIdentifierC> {
}

const lenses = {
  type: Lens.fromProp<ResourceIdentifier>()('type'),
  id: Lens.fromProp<ResourceIdentifier>()('id')
};

export const ResourceIdentifier = {
  iso: {
    string: new Iso<ResourceIdentifier, string>(
      s => `${lenses.type.get(s)}:${lenses.id.get(s)}`,
      a => {
        const strings = a.split(':');

        return {
          type: strings[0],
          id: strings[1]
        };
      }
    )
  },
  lens: lenses
};
