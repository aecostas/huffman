var utils = require('./utils.js');

export default class Huffman {
  constructor(code) {
    this._encoded = {};
  };

/**
 * Implements huffman algorithm
 *
 * @param {Number} groupsize Number of elements to group in this iteration
 * @param {Number} D Length of the code
 * @param {Array.<Object>} alphabet
 * @param {Array.<String>} code For instance [0,1,2]
 */
  huffman(groupsize, D, pAlphabet, code) {
    let alphabetNext;
    let sorted = pAlphabet;

    for (let i = 0; i < groupsize; i++) {
      let character = sorted[sorted.length - (groupsize - i)];

      for (let letter of character.s) {
        this.encoded[letter] = code[i] + (this.encoded[letter] || '');
      }
    }

    // end of recursion
    if (pAlphabet.length === groupsize) {
      return;
    }

    alphabetNext = sorted.slice(0, (sorted.length - groupsize));

    // create new element from the last D ones
    let c = {s: '', p: 0};

    for (let s of sorted.slice(-groupsize)) {
      c.s = c.s + s.s;
      c.p = c.p + s.p;
    };

    utils.insertSorted(alphabetNext, c);
    this.huffman(D, D, alphabetNext, code);
  };

/**
 * Compares the field 'p' (probability)
 * in the given objects
 *
 * @param {Object} a {p: <probability>,...}
 * @param {Object} b {p: <probability>,...}
 *
 * @return {Number}
 */
  _compare(a, b) {
    if (a.p > b.p) {
      return -1;
    };
    if (a.p < b.p) {
      return 1;
    };
    return 0;
  };

  encode(code, frequencies) {
    let D = code.length;

    /**
    * @member {int} Number of elements of the source alphabet
    */
    let q;

    /**
    * @member {Object}
    */
    let alphabet;

    this.encoded = {};
    alphabet = utils.calculateProbabilities(frequencies);

    q = frequencies.length;
    let groupsize = 2 + ((q - 2) % (D - 1));

    let alphabetSorted = alphabet.sort(this._compare);

    this.huffman(groupsize, D, alphabetSorted, code);
    return this.encoded;
  }

}
