import * as t from 'io-ts';
import {DataC} from './DataC';
import {ResourceC} from './ResourceC';

export const JsonApiC = t.intersection([
  t.type({
    data: t.union([
      DataC,
      t.array(DataC),
      t.null
    ])
  }),
  t.partial({
    included: t.array(ResourceC)
  })
]);
