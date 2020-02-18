import * as t from 'io-ts';
declare type NonEmptyArrayBrand = {
    readonly NonEmptyArray: unique symbol;
};
export declare type NonEmptyArray<A> = t.Branded<Array<A>, NonEmptyArrayBrand>;
export declare const NonEmptyArrayC: <C extends t.Mixed>(codec: C) => t.BrandC<t.ArrayC<C>, NonEmptyArrayBrand>;
export {};
