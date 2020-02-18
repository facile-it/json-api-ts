import {expect} from 'chai';
import {DocumentC} from '../../../src/io/DocumentC';

describe('DocumentC', () => {
  describe('is', () => {
    it('should return a boolean', () => {
      expect(DocumentC.is({})).to.be.false;

      expect(DocumentC.is({data: false})).to.be.false;
      expect(DocumentC.is({data: 0})).to.be.false;
      expect(DocumentC.is({data: ''})).to.be.false;

      expect(DocumentC.is({data: null})).to.be.true;
      expect(DocumentC.is({data: {}})).to.be.true;
      expect(DocumentC.is({data: [{}]})).to.be.true;

      expect(DocumentC.is({data: {type: false}})).to.be.false;
      expect(DocumentC.is({data: {type: ''}})).to.be.false;
      expect(DocumentC.is({data: {id: false}})).to.be.false;
      expect(DocumentC.is({data: {id: ''}})).to.be.false;
      expect(DocumentC.is({data: {attributes: false}})).to.be.false;
      expect(DocumentC.is({data: {relationships: false}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: false}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {type: 'a'}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: {id: '1'}}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: [{}]}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: [{type: 'a'}]}}})).to.be.false;
      expect(DocumentC.is({data: {relationships: {a: [{id: '1'}]}}})).to.be.false;
    });

    it('should return false with arrays of non-resources (gcanti/io-ts#407)', () => {
      expect(DocumentC.is({data: ['']})).to.be.false;
      expect(DocumentC.is({data: [{type: false}]})).to.be.false;
      expect(DocumentC.is({data: [{type: ''}]})).to.be.false;
      expect(DocumentC.is({data: [{id: false}]})).to.be.false;
      expect(DocumentC.is({data: [{id: ''}]})).to.be.false;
      expect(DocumentC.is({data: [{attributes: false}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: false}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: false}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {type: 'a'}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: {id: '1'}}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: [{}]}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: [{type: 'a'}]}}]})).to.be.false;
      expect(DocumentC.is({data: [{relationships: {a: [{id: '1'}]}}]})).to.be.false;
    });
  });
});
