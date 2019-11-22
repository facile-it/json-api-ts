import * as t from 'io-ts';
import {RelationshipsC} from './io/RelationshipsC';

export interface Relationships extends t.TypeOf<typeof RelationshipsC> {
}
