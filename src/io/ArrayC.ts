import {identity} from 'fp-ts/lib/function';
import * as t from 'io-ts';

const is = <T>() => (u: unknown): u is Array<T> => u instanceof Array;

export const ArrayC = <A = never>() => new t.Type<Array<A>>(
  'UnknownArray',
  is<A>(),
  (u, c) => is<A>()(u)
    ? t.success(u)
    : t.failure(u, c),
  identity
);
