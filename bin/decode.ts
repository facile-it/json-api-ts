#!/usr/bin/env node

import {either, fold} from 'fp-ts/lib/Either';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {taskEither} from 'fp-ts/lib/TaskEither';
import {decode} from '../src';
import {ArrayC} from '../src/io/ArrayC';
import {DocumentC} from '../src/io/DocumentC';
import {Json} from './Json';

const TE = pipeable(taskEither);
const E = pipeable(either);

pipe(
  Json.fromFile(process.argv[2]),
  TE.map(
    u => {
      if (!DocumentC.is(u)) {
        console.warn('Cannot find a JSON:API document');

        return u;
      }

      const count = null === u.data || undefined === u.data
        ? 0
        : ArrayC().is(u.data)
          ? u.data.length
          : 1;
      console.log(`>¦  Decoding ${count} item(s) with ${(u.included || []).length} relationship(s)`);

      return u;
    }
  ),
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

