#!/usr/bin/env node

import {either, fold} from 'fp-ts/lib/Either';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {taskEither} from 'fp-ts/lib/TaskEither';
import {encode} from '../src';
import {ArrayC} from '../src/io/ArrayC';
import {Json} from '../src/Json';

const TE = pipeable(taskEither);
const E = pipeable(either);

pipe(
  Json.fromFile(process.argv[2]),
  TE.map(
    u => {
      const count = null === u || undefined === u
        ? 0
        : ArrayC().is(u)
          ? u.length
          : 1;
      console.log(`>¦  Encoding ${count} item(s)`);

      return u;
    }
  ),
  TE.map(encode),
  TE.map(
    (document) => {
      console.log(` ¦> ${(document.included || []).length} relationship(s) found}`);

      return document;
    }
  )
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
