import chai from 'chai';
import Huffman from '../lib/huffman.min.js';

chai.expect();

// const expect = chai.expect;

let lib;
let code;
let alphabet;

describe('Given an instance of my library', function () {
  before(function () {
    lib = new Huffman();
    alphabet = [
      {s: 'A', f: 34},
      {s: 'B', f: 12},
      {s: 'C', f: 100},
      {s: 'D', f: 45},
      {s: 'E', f: 2},
      {s: 'F', f: 5},
      {s: 'G', f: 500}];
    code = [0, 1, 2];

  });
  // describe('when I need the name', function () {
  //   it('should return the name', () => {
  //     expect(lib.name).to.be.equal('Huffman');
  //   });
  // });
  describe('when I need the name', function () {
    it('should return the name', () => {
      let encoded = lib.encode(code, alphabet);

      console.warn(encoded);
    });
  });

});
