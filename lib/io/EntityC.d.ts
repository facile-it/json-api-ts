import * as t from 'io-ts';
export declare const EntityC: t.TypeC<{
    _type: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
    _id: t.UnionC<[t.NumberC, import("io-ts-types/lib/NonEmptyString").NonEmptyStringC]>;
}>;
