import {ArrayC} from './io/ArrayC';
import {DocumentC} from './io/DocumentC';
import {JsonApiData} from './JsonApiData';
import {RawData} from './RawData';
import {ResourceRecord} from './ResourceRecord';

export type Payload = unknown

export const Payload = {
  fromJson: (u: unknown): Payload => {
    if (!DocumentC.is(u)) {
      return RawData.fromJson(u, {});
    }

    const resources = ResourceRecord.fromResources(u.included || []);

    return ArrayC<JsonApiData>().is(u.data)
      ? u.data.map(data => RawData.fromJson(data, resources))
      : RawData.fromJson(u.data, resources);
  }
};
