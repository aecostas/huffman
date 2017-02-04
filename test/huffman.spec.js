import chai from 'chai';
import Huffman from '../lib/huffman.min.js';

// const expect = chai.expect;

let lib;
let list;

describe('Utils', function () {
  before(function () {
    lib = new Huffman();
    list = [
      {
        value: 1,
        p: 0.5
      },
      {
        value: 2,
        p: 0.3
      },
      {
        value: 3,
        p: 0.2
      }
    ];
  });

  it('Inserting sorted at the beginning', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.7 });
    chai.expect(testList[0].p).to.deep.equal(0.7);
  });

  it('Inserting sorted at the beginning - bottom overlapped', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.5 });
    chai.expect(testList[0].p).to.deep.equal(0.5);
  });

  it('Inserting sorted in the  middle - top overlapped', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.2 });
    chai.expect(testList[2].p).to.deep.equal(0.2);
  });

  it('Inserting sorted in the middle', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.3 });
    chai.expect(testList[1].p).to.deep.equal(0.3);
  });

  it('Inserting sorted in the middle - overlapped', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.4 });
    chai.expect(testList[1].p).to.deep.equal(0.4);
  });

  it('Inserting sorted at the end', () => {
    let testList = Array.from(list);

    lib._insertSorted(testList, {value: '10', p: 0.1 });
    chai.expect(testList[3].p).to.deep.equal(0.1);
  });

});

describe('Huffman', function () {
  before(function () {
    lib = new Huffman();

  });

  describe('Encoding', function () {
    it('should encode the frecuencies in ternary', () => {
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

    it('should encode the frecuencies in ternary (II)', () => {
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
  });

});
