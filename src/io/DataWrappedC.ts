import * as t from 'io-ts';

export const DataWrappedC = <C extends t.Mixed>(codec: C) => t.type({
  data: codec
});
