import { array } from "fp-ts/Array";
import { identity } from "fp-ts/function";
import { pipe, pipeable } from "fp-ts/pipeable";
import { getMonad, listen, pass, Writer } from "fp-ts/Writer";
import * as t from "io-ts";
import { ArrayC } from "./io/ArrayC";
import { EntityC } from "./io/EntityC";
import { NonEmptyArrayC } from "./io/NonEmptyArrayC";
import { ResourceIdentifierC } from "./io/ResourceIdentifierC";
import { JsonApiData } from "./JsonApiData";
import { RelationshipsCache } from "./RelationshipsCache";
import { RelationshipsRecord } from "./RelationshipsRecord";
import { UnknownRecord } from "./UnknownRecord";

export type CompoundDocument<A> = Writer<
  RelationshipsCache | RelationshipsRecord,
  A
>;

const m = getMonad(RelationshipsCache.monoid.self);
const M = pipeable(m);

const fromUnknown = (u: unknown): CompoundDocument<unknown> => m.of(u);

const fromArray = (u: Array<unknown>): CompoundDocument<Array<unknown>> =>
  array.traverse(m)(u, fromJson);

const fromRecord = (u: UnknownRecord): CompoundDocument<UnknownRecord> =>
  Object.keys(u).reduce(
    (
      writer: CompoundDocument<UnknownRecord>,
      key: string
    ): CompoundDocument<UnknownRecord> =>
      pipe(
        writer,
        M.chain(
          // The accumulator (bag of relationships) has to be modified depending on returned data (the actual JSON).
          (attributes) =>
            pass(
              pipe(
                fromJson(u[key]),
                M.map((data) =>
                  !t.UnknownRecord.is(data) && !ArrayC<unknown>().is(data)
                    ? /**
                       * No transformation needed with a scalar, just map the value in the result (as an [attribute][1]).
                       *
                       * [1]: https://jsonapi.org/format/#document-resource-object-attributes
                       */
                      [{ ...attributes, [key]: data }, identity]
                    : // Beware: *non-empty* array.
                    ResourceIdentifierC.is(data) ||
                      NonEmptyArrayC(ResourceIdentifierC).is(data)
                    ? /**
                       * Child resources must be added to the bag of [relationships][1] (the accumulator). Leave the
                       * attributes alone.
                       *
                       * [1]: https://jsonapi.org/format/#document-resource-object-relationships
                       */
                      [
                        attributes,
                        (relationships) =>
                          RelationshipsCache.monoid.self.concat(relationships, {
                            [key]: data,
                          }),
                      ]
                    : /**
                       * A nested non-resource object must be added to the attributes just like a scalar, while current
                       * relationships have to mirror the nesting.
                       */
                      [
                        { ...attributes, [key]: data },
                        (relationships) =>
                          RelationshipsCache.nestLocal(relationships, key),
                      ]
                )
              )
            )
        )
      ),
    fromUnknown({}) as CompoundDocument<UnknownRecord>
  );

const fromJson = (
  u: unknown,
  primaryData: boolean = false
): CompoundDocument<unknown> =>
  !t.UnknownRecord.is(u) && !ArrayC<unknown>().is(u)
    ? fromUnknown(u)
    : pass(
        // pass() allows both Writer elements to be modified at once.
        pipe(
          listen(
            // Expose Writer accumulator.
            (ArrayC<unknown>().is(u)
              ? fromArray(u)
              : fromRecord(u)) as CompoundDocument<unknown[] | UnknownRecord>
          ),
          M.map(([data, relationships]) => {
            const cache = RelationshipsCache.fromRelationships(relationships);
            const locals = RelationshipsCache.lens.local.get(cache);

            /**
             * If resulting data is an entity - or if we're parsing [primary data][1] -, convert it to JSON:API format and
             * flush local relationships.
             * Otherwise, just forward everything to the upper level.
             *
             * [1]: https://jsonapi.org/format/#document-top-level
             */
            return (primaryData &&
              !NonEmptyArrayC(ResourceIdentifierC).is(data)) || // Prevent repeating the conversion.
              EntityC.is(data)
              ? [
                  ArrayC<UnknownRecord>().is(data)
                    ? data.map((record) => JsonApiData.fromJson(record, locals))
                    : JsonApiData.fromJson(data, locals),
                  RelationshipsCache.emptyLocal,
                ]
              : [data, identity];
          })
        )
      );

export const CompoundDocument = {
  fromArray: fromArray,
  fromJson: fromJson,
  fromRecord: fromRecord,
  fromUnknown: fromUnknown,
};
