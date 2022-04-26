import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";
import { ResourceIdentifierC } from "./ResourceIdentifierC";

export const RelationshipsC = t.record(
  NonEmptyString,
  t.type({
    data: t.union([ResourceIdentifierC, t.array(ResourceIdentifierC)]),
  })
);
