import { Monoid } from "fp-ts/Monoid";
import * as t from "io-ts";
import { Lens } from "monocle-ts";
import { ArrayC } from "./io/ArrayC";
import { RelationshipsCacheC } from "./io/RelationshipsCacheC";
import { RelationshipsRecord } from "./RelationshipsRecord";
import { ResourceIdentifier } from "./ResourceIdentifier";

export interface RelationshipsCache
  extends t.TypeOf<typeof RelationshipsCacheC> {}

const fromRelationships = (
  x: RelationshipsCache | RelationshipsRecord
): RelationshipsCache => (RelationshipsCacheC.is(x) ? x : [0, {}, x]);

const lenses = {
  counter: new Lens<RelationshipsCache, number>(
    (s) => s[0],
    (a) => (s) => [a, s[1], s[2]]
  ),
  global: new Lens<RelationshipsCache, RelationshipsRecord>(
    (s) => s[1],
    (a) => (s) => [s[0], a, s[2]]
  ),
  local: new Lens<RelationshipsCache, RelationshipsRecord>(
    (s) => s[2],
    (a) => (s) => [s[0], s[1], a]
  ),
};

const monoid: Monoid<RelationshipsCache | RelationshipsRecord> = {
  empty: [0, {}, {}],
  concat: (x, y): RelationshipsCache => {
    const [xs, ys] = [x, y].map(fromRelationships) as [
      RelationshipsCache,
      RelationshipsCache
    ];
    const locals = Object.values(lenses.local.get(ys)).reduce<
      Array<ResourceIdentifier>
    >(
      (
        array: Array<ResourceIdentifier>,
        item: ResourceIdentifier | Array<ResourceIdentifier>
      ): Array<ResourceIdentifier> => [
        ...array,
        ...(ArrayC<ResourceIdentifier>().is(item) ? item : [item]),
      ],
      []
    );

    return [
      lenses.counter.get(xs) + (lenses.counter.get(ys) || locals.length),
      {
        ...lenses.global.get(xs),
        ...lenses.global.get(ys),
        ...locals.reduce(
          (
            record: RelationshipsRecord,
            identifier: ResourceIdentifier
          ): RelationshipsRecord => ({
            ...record,
            [ResourceIdentifier.iso.string.get(identifier)]: identifier,
          }),
          {}
        ),
      },
      {
        ...lenses.local.get(xs),
        ...lenses.local.get(ys),
      },
    ];
  },
};

export const RelationshipsCache = {
  fromRelationships: fromRelationships,
  emptyLocal: (
    cache: RelationshipsCache | RelationshipsRecord
  ): RelationshipsCache => lenses.local.set({})(fromRelationships(cache)),
  nestLocal: (
    cache: RelationshipsCache | RelationshipsRecord,
    key: string
  ): RelationshipsCache =>
    ((cache: RelationshipsCache): RelationshipsCache =>
      lenses.local.set(RelationshipsRecord.nest(lenses.local.get(cache), key))(
        cache
      ))(fromRelationships(cache)),
  lens: lenses,
  monoid: {
    self: monoid,
  },
};
