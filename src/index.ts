import {Document} from './Document';
import {Payload} from './Payload';

export const encode = Document.fromJson;

export const decode = Payload.fromJson;
