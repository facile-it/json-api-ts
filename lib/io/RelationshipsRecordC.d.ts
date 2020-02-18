import * as t from 'io-ts';
export declare const RelationshipsRecordC: t.RecordC<import("io-ts-types/lib/NonEmptyString").NonEmptyStringC, t.UnionC<[t.TypeC<{
    type: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
    id: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
}>, t.ArrayC<t.TypeC<{
    type: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
    id: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
}>>]>>;
