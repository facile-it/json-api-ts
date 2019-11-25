import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export const ResourceIdentifierC = t.type({
  type: NonEmptyString,
  id: NonEmptyString
});
