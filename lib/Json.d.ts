export declare const Json: {
    fromFile: (path: string) => import("fp-ts/lib/TaskEither").TaskEither<Error, unknown>;
    fromString: (s: string) => import("fp-ts/lib/Either").Either<Error, unknown>;
};
