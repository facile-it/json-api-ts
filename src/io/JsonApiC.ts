import * as t from 'io-ts';
import {JsonApiDataC} from './JsonApiDataC';
import {ResourceC} from './ResourceC';

export const JsonApiC = t.intersection([
  t.type({
    data: t.union([
      JsonApiDataC,
      t.array(JsonApiDataC),
      t.null
    ])
  }),
  t.partial({
    included: t.array(ResourceC)
  })
]);
