import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";
import { AttributesC } from "./AttributesC";
import { RelationshipsC } from "./RelationshipsC";

export const JsonApiDataC = t.partial({
  type: NonEmptyString,
  id: NonEmptyString,
  attributes: AttributesC,
  relationships: RelationshipsC,
});
