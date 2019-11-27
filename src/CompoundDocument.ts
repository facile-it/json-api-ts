import {array} from 'fp-ts/lib/Array';
import {identity} from 'fp-ts/lib/function';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {getMonad, listen, pass, Writer} from 'fp-ts/lib/Writer';
import * as t from 'io-ts';
import {ArrayC} from './io/ArrayC';
import {EntityC} from './io/EntityC';
import {NonEmptyArrayC} from './io/NonEmptyArrayC';
import {ResourceIdentifierC} from './io/ResourceIdentifierC';
import {JsonApiData} from './JsonApiData';
import {RelationshipsCache} from './RelationshipsCache';
import {RelationshipsRecord} from './RelationshipsRecord';
import {UnknownRecord} from './UnknownRecord';

export type CompoundDocument<A> = Writer<RelationshipsCache | RelationshipsRecord, A>

const m = getMonad(RelationshipsCache.monoid.self);
const M = pipeable(m);

const fromUnknown = (u: unknown): CompoundDocument<unknown> =>
  m.of(u);

const fromArray = (u: Array<unknown>): CompoundDocument<Array<unknown>> =>
  array.traverse(m)(u, fromJson);

const fromRecord = (u: UnknownRecord): CompoundDocument<UnknownRecord> =>
  Object.keys(u)
    .reduce(
      (writer: CompoundDocument<UnknownRecord>, key: string): CompoundDocument<UnknownRecord> =>
        pipe(
          writer,
          M.chain(
            record => pass(
              pipe(
                fromJson(u[key]),
                M.map(
                  data => !t.UnknownRecord.is(data)
                    ? [
                      {...record, [key]: data},
                      identity
                    ]
                    : ResourceIdentifierC.is(data) || NonEmptyArrayC(ResourceIdentifierC).is(data)
                      ? [
                        record,
                        relationships => RelationshipsCache.monoid.self
                          .concat(relationships, {[key]: data})
                      ]
                      : [
                        {...record, [key]: data},
                        relationships => RelationshipsCache.nestLocal(relationships, key)
                      ]
                )
              )
            )
          )
        ),
      fromUnknown({}) as CompoundDocument<UnknownRecord>
    );

const fromJson = (u: unknown, primaryData: boolean = false): CompoundDocument<unknown> =>
  !t.UnknownRecord.is(u)
    ? fromUnknown(u)
    : pass(
    pipe(
      listen(
        (
          ArrayC<unknown>().is(u)
            ? fromArray(u)
            : fromRecord(u)
        ) as CompoundDocument<unknown[] | UnknownRecord>
      ),
      M.map(
        ([data, relationships]) => {
          const cache = RelationshipsCache.fromRelationships(relationships);
          const locals = RelationshipsCache.lens.local.get(cache);

          return primaryData && !NonEmptyArrayC(ResourceIdentifierC).is(data) || EntityC.is(data)
            ? [
              ArrayC<UnknownRecord>().is(data)
                ? data.map(record => JsonApiData.fromJson(record, locals))
                : JsonApiData.fromJson(data, locals),
              RelationshipsCache.emptyLocal
            ]
            : [data, identity];
        }
      )
    )
    );

export const CompoundDocument = {
  fromJson: fromJson
};
