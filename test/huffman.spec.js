import chai from 'chai';
import Huffman from '../lib/huffman.min.js';

let lib;

describe('Huffman', function () {
  before(function () {
  });

  describe('Codes', function () {
    it('binary', () => {
      let huffman2 = new Huffman(2, 'AAABB');

      chai.expect(huffman2.code).to.have.members([0, 1]);
    });

    it('ternary', () => {
      let huffman2 = new Huffman(3, 'AAABB');

      chai.expect(huffman2.code).to.have.members([0, 1, 2]);
    });

    it('cuaternary', () => {
      let huffman2 = new Huffman(4, 'AAABB');

      chai.expect(huffman2.code).to.have.members([0, 1, 2, 3]);
    });

  });

  describe('Encoding', function () {
    it('should encode the alphabet in ternary - first groupsize != D', () => {
      let encoded;

      lib = new Huffman(3, 'AAAAAABBBBCCCDDDEEFF');
      encoded = lib.targetAlphabet;

      chai.expect(encoded['A']).to.deep.equal('1');
      chai.expect(encoded['B']).to.deep.equal('00');
      chai.expect(encoded['C']).to.deep.equal('01');
      chai.expect(encoded['D']).to.deep.equal('02');
      chai.expect(encoded['E']).to.deep.equal('20');
      chai.expect(encoded['F']).to.deep.equal('21');
    });

    it('should encode the alphabet in ternary - first groupsize === D', () => {
      let encoded;

      lib = new Huffman(3, 'AAAAAABBBBCCCDDDEEFFGG');
      encoded = lib.targetAlphabet;

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

      lib = new Huffman(2, 'AAAAAAABCD');
      encoded = lib.targetAlphabet;

      chai.expect(encoded['A']).to.deep.equal('0');
      chai.expect(encoded['B']).to.deep.equal('11');
      chai.expect(encoded['C']).to.deep.equal('100');
      chai.expect(encoded['D']).to.deep.equal('101');
    });

  });

});
