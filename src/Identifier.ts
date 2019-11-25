import * as t from 'io-ts';
import {IdentifierC} from './io/IdentifierC';

export type Identifier = t.TypeOf<typeof IdentifierC>
