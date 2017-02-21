var utils = require('./utils.js');
var StringStats = require('stringstats');

export default class Huffman {
  constructor(codeLength, corpus) {
    this.codeLength = codeLength;

    if (!Number.isInteger(codeLength)) {
      throw new Error();
    }
    // code = range(codeLength)
    this._code = Array.apply(null, Array(codeLength));
    this._code = this._code.map((x, i) => i);

    this._setCorpus(corpus);
  };

  get alphabet() {
    return this._alphabet;
  }

  get code() {
    return this._code;
  }

  get encodingAlphabet() {
    return this._targetAlphabet;
  }

  _setCorpus(str) {
    let stats = new StringStats(str).stats;

    this._alphabet = Object.keys(stats).map((k) => ({s: k, p: stats[k].probability}));
    this._targetAlphabet = this.encode(this._code, this._alphabet);
  }

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

  encode(code, alphabet) {
    let D = code.length;

    /**
    * @member {int} Number of elements of the source alphabet
    */
    let q;

    this.encoded = {};

    q = alphabet.length;
    let groupsize = 2 + ((q - 2) % (D - 1));
    let alphabetSorted = alphabet.sort(utils.compare);

    this.huffman(groupsize, D, alphabetSorted, code);
    return this.encoded;
  }

}
