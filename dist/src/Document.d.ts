import * as t from 'io-ts';
import { CompoundDocument } from './CompoundDocument';
import { DocumentC } from './io/DocumentC';
export interface Document extends t.TypeOf<typeof DocumentC> {
}
export declare const Document: {
    fromCompoundDocument: (w: CompoundDocument<unknown>) => Document;
    fromJson: (u: unknown) => Document;
};
