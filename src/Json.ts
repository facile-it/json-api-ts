import {tryCatch} from 'fp-ts/lib/Either';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {fromEither, taskEither, taskify} from 'fp-ts/lib/TaskEither';
import {readFile} from 'fs';

const TE = pipeable(taskEither);

const fromString = (s: string) => tryCatch(
  () => JSON.parse(s) as unknown,
  error => error instanceof Error
    ? error
    : Error('Cannot parse JSON data')
);

const fromFile = (path: string) => pipe(
  taskify(readFile)(path),
  TE.mapLeft(({message}) => Error(message)),
  TE.map(b => b.toString()),
  TE.chain(s => fromEither(fromString(s)))
);

export const Json = {
  fromFile: fromFile,
  fromString: fromString
};
