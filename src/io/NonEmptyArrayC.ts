import * as t from 'io-ts';

type NonEmptyArrayBrand = { readonly NonEmptyArray: unique symbol };
export type NonEmptyArray<A> = t.Branded<Array<A>, NonEmptyArrayBrand>

export const NonEmptyArrayC = <C extends t.Mixed>(codec: C) => t.brand(
  t.array(codec),
  (a): a is NonEmptyArray<t.TypeOf<C>> => a.length > 0,
  'NonEmptyArray'
);
