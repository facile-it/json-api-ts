import * as t from 'io-ts';
import {EntityC} from './io/EntityC';

export interface Entity extends t.TypeOf<typeof EntityC> {
}
