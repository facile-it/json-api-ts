import * as t from 'io-ts';
import {AttributesC} from './io/AttributesC';

export interface Attributes extends t.TypeOf<typeof AttributesC> {
}
