import { identity } from "fp-ts/function";
import * as t from "io-ts";

const is =
  <A>() =>
  (u: unknown): u is Array<A> =>
    u instanceof Array;

export const ArrayC = <A = never>() =>
  new t.Type<Array<A>>(
    "Array",
    is<A>(),
    (u, c) => (is<A>()(u) ? t.success(u) : t.failure(u, c)),
    identity
  );
