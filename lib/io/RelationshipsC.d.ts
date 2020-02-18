import * as t from 'io-ts';
export declare const RelationshipsC: t.RecordC<import("io-ts-types/lib/NonEmptyString").NonEmptyStringC, t.TypeC<{
    data: t.UnionC<[t.TypeC<{
        type: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
        id: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
    }>, t.ArrayC<t.TypeC<{
        type: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
        id: import("io-ts-types/lib/NonEmptyString").NonEmptyStringC;
    }>>]>;
}>>;
