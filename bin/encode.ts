#!/usr/bin/env node

import {either, fold} from 'fp-ts/lib/Either';
import {pipe, pipeable} from 'fp-ts/lib/pipeable';
import {taskEither} from 'fp-ts/lib/TaskEither';
import {CompoundDocument} from '../src/CompoundDocument';
import {Document} from '../src/Document';
import {ArrayC} from '../src/io/ArrayC';
import {Json} from '../src/Json';
import {RelationshipsCache} from '../src/RelationshipsCache';

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
  TE.map(u => CompoundDocument.fromJson(u, true)),
  TE.map(
    w => {
      const [data, relationships] = w();
      const cache = RelationshipsCache.fromRelationships(relationships);
      const counter = RelationshipsCache.lens.counter.get(cache);
      const included = Object.keys(RelationshipsCache.lens.global.get(cache)).length;
      console.log(` ¦> ${included} resource(s) found among ${counter} relationship(s)`);

      return w;
    }
  ),
  TE.map(Document.fromCompoundDocument)
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
