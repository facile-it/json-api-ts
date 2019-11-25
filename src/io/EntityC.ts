import * as t from 'io-ts';
import {NonEmptyString} from 'io-ts-types/lib/NonEmptyString';

export const EntityC = t.type({
  _type: NonEmptyString,
  _id: t.union([t.number, NonEmptyString])
});
