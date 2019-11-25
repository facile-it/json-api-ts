import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export const IdentifierC = t.union([
  t.number,
  NonEmptyString
]);
