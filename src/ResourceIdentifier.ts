import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';
import {Iso} from 'monocle-ts';
import {ResourceIdentifierC} from './io/ResourceIdentifierC';

export interface ResourceIdentifier extends t.TypeOf<typeof ResourceIdentifierC> {
}

export const ResourceIdentifier = {
  iso: {
    string: new Iso<ResourceIdentifier, string>(
      s => `${s.type}:${s.id}`,
      a => {
        const strings = a.split(':');

        return {
          type: strings[0] as NonEmptyString,
          id: strings[1] as NonEmptyString
        };
      }
    )
  }
};
