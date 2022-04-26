import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";
import { IdentifierC } from "./IdentifierC";

export const EntityC = t.type({
  _type: NonEmptyString,
  _id: IdentifierC,
});
