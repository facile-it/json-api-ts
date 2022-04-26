import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/NonEmptyString";

export const IdentifierC = t.union([t.number, NonEmptyString]);
