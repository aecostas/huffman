import chai from 'chai';
import Huffman from '../lib/huffman.min.js';

let lib;

describe('Huffman', function () {
  before(function () {
    lib = new Huffman();

  });

  describe('Encoding', function () {
    it('should encode the alphabet in ternary - first groupsize != D', () => {
      let encoded;
      let alphabet;
      let code = [0, 1, 2];

      alphabet = [
          {s: 'A', f: 6},
          {s: 'B', f: 4},
          {s: 'C', f: 3},
          {s: 'D', f: 3},
          {s: 'E', f: 2},
          {s: 'F', f: 2}];

      encoded = lib.encode(code, alphabet);
      chai.expect(encoded['A']).to.deep.equal('1');
      chai.expect(encoded['B']).to.deep.equal('00');
      chai.expect(encoded['C']).to.deep.equal('01');
      chai.expect(encoded['D']).to.deep.equal('02');
      chai.expect(encoded['E']).to.deep.equal('20');
      chai.expect(encoded['F']).to.deep.equal('21');
    });

    it('should encode the alphabet in ternary - first groupsize === D', () => {
      let encoded;
      let alphabet;
      let code = [0, 1, 2];

      alphabet = [
          {s: 'A', f: 4},
          {s: 'B', f: 4},
          {s: 'C', f: 3},
          {s: 'D', f: 3},
          {s: 'E', f: 2},
          {s: 'F', f: 2},
          {s: 'G', f: 2}];

      encoded = lib.encode(code, alphabet);
      chai.expect(encoded['A']).to.deep.equal('2');
      chai.expect(encoded['B']).to.deep.equal('00');
      chai.expect(encoded['C']).to.deep.equal('01');
      chai.expect(encoded['D']).to.deep.equal('02');
      chai.expect(encoded['E']).to.deep.equal('10');
      chai.expect(encoded['F']).to.deep.equal('11');
      chai.expect(encoded['G']).to.deep.equal('12');
    });

    it('should encode the alphabet in binary', () => {
      let encoded;
      let alphabet;
      let code = [0, 1];

      alphabet = [
          {s: 'A', f: 7},
          {s: 'B', f: 1},
          {s: 'C', f: 1},
          {s: 'D', f: 1}];

      encoded = lib.encode(code, alphabet);
      chai.expect(encoded['A']).to.deep.equal('0');
      chai.expect(encoded['B']).to.deep.equal('11');
      chai.expect(encoded['C']).to.deep.equal('100');
      chai.expect(encoded['D']).to.deep.equal('101');
    });

  });

});
