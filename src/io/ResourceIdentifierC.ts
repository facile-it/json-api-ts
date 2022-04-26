import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";

export const ResourceIdentifierC = t.type({
  type: NonEmptyString,
  id: NonEmptyString,
});
