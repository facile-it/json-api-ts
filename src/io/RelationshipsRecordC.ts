import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";
import { ResourceIdentifierC } from "./ResourceIdentifierC";

export const RelationshipsRecordC = t.record(
  NonEmptyString,
  t.union([ResourceIdentifierC, t.array(ResourceIdentifierC)])
);
