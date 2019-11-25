import {Resource} from './Resource';
import {ResourceIdentifier} from './ResourceIdentifier';

export interface ResourceRecord extends Record<string, Resource> {
}

export const ResourceRecord = {
  fromResources: (resources: Array<Resource>): ResourceRecord =>
    resources.reduce(
      (record: ResourceRecord, resource: Resource): ResourceRecord => ({
        ...record,
        [ResourceIdentifier.iso.string.get(resource)]: resource
      }),
      {}
    )
};
