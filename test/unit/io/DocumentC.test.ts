import {expect} from 'chai';
import {DocumentC} from '../../../src/io/DocumentC';

describe('DocumentC', () => {
  describe('is', () => {
    it('should return false with invalid JSON:API documents', () => {
      expect(DocumentC.is({})).to.be.false;
      expect(DocumentC.is([])).to.be.false;
      expect(DocumentC.is({data: false})).to.be.false;
      expect(DocumentC.is({data: 0})).to.be.false;
      expect(DocumentC.is({data: ''})).to.be.false;
      expect(DocumentC.is({data: {type: false}})).to.be.false;
      expect(DocumentC.is({data: {type: ''}})).to.be.false;
      expect(DocumentC.is({data: {id: false}})).to.be.false;
      expect(DocumentC.is({data: {id: ''}})).to.be.false;
      expect(DocumentC.is({data: {relationships: []}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: {}}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: {type: 'a'}}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: {id: '1'}}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: {type: '', id: ''}}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: [{}]}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: [{type: 'a'}]}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: [{id: '1'}]}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {data: [{type: '', id: ''}]}}}})).to.be.false;
      expect(DocumentC.is({data: null, included: {}})).to.be.false;
      expect(DocumentC.is({data: null, included: [{}]})).to.be.false;
      expect(DocumentC.is({data: null, included: [{type: 'a'}]})).to.be.false;
      expect(DocumentC.is({data: null, included: [{id: '1'}]})).to.be.false;
      expect(DocumentC.is({data: null, included: [{type: '', id: ''}]})).to.be.false;
    });

    it('should return false with arrays of non-resources (gcanti/io-ts#407)', () => {
      expect(DocumentC.is({data: ['']})).to.be.false;
      expect(DocumentC.is({data: {attributes: []}})).to.be.false;
      expect(DocumentC.is({data: [{type: false}]})).to.be.false;
      expect(DocumentC.is({data: [{type: ''}]})).to.be.false;
      expect(DocumentC.is({data: [{id: false}]})).to.be.false;
      expect(DocumentC.is({data: [{id: ''}]})).to.be.false;
      expect(DocumentC.is({data: [{attributes: []}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: []}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: {}}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: {type: 'a'}}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: {id: '1'}}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: {type: '', id: ''}}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: [{}]}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: [{type: 'a'}]}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: [{id: '1'}]}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {data: [{type: '', id: ''}]}}}]})).to.be.false;
    });

    it('should return true with valid JSON:API documents', () => {
      expect(DocumentC.is({data: null})).to.be.true;
      expect(DocumentC.is({data: {}})).to.be.true;
      expect(DocumentC.is({data: []})).to.be.true;
      expect(DocumentC.is({data: [{}]})).to.be.true;
      expect(DocumentC.is({data: {type: 'a'}})).to.be.true;
      expect(DocumentC.is({data: {id: '1'}})).to.be.true;
      expect(DocumentC.is({data: {attributes: {}}})).to.be.true;
      expect(DocumentC.is({data: {relationships: {}}})).to.be.true;
      expect(DocumentC.is({data: {relationships: {a: {data: {type: 'a', id: '1'}}}}})).to.be.true;
      expect(DocumentC.is({data: {relationships: {a: {data: []}}}})).to.be.true;
      expect(DocumentC.is({data: {relationships: {a: {data: [{type: 'a', id: '1'}]}}}})).to.be.true;
      expect(DocumentC.is({data: [{type: 'a'}]})).to.be.true;
      expect(DocumentC.is({data: [{id: '1'}]})).to.be.true;
      expect(DocumentC.is({data: [{attributes: {}}]})).to.be.true;
      expect(DocumentC.is({data: [{relationships: {}}]})).to.be.true;
      expect(DocumentC.is({data: [{relationships: {a: {data: {type: 'a', id: '1'}}}}]})).to.be.true;
      expect(DocumentC.is({data: [{relationships: {a: {data: []}}}]})).to.be.true;
      expect(DocumentC.is({data: [{relationships: {a: {data: [{type: 'a', id: '1'}]}}}]})).to.be.true;
      expect(DocumentC.is({data: null, included: []})).to.be.true;
      expect(DocumentC.is({data: null, included: [{type: 'a', id: '1'}]})).to.be.true;
    });
  });
});
