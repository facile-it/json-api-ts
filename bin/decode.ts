#!/usr/bin/env node

import {either, fold} from 'fp-ts/lib/Either';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {taskEither} from 'fp-ts/lib/TaskEither';
import {decode} from '../src';
import {Json} from './Json';

const TE = pipeable(taskEither);
const E = pipeable(either);

pipe(
  Json.fromFile(process.argv[2]),
  TE.map(decode)
)()
  .then(
    either => pipe(
      either,
      E.map(JSON.stringify),
      fold(
        error => {
          throw error;
        },
        data => console.log(data)
      )
    )
  )
  .catch(error => console.error(error));
