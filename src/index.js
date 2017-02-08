export default class Huffman {
  constructor() {
    this.encoded = {};
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

    this._insertSorted(alphabetNext, c);
    this.huffman(D, D, alphabetNext, code);
  };

  /**
  * Insert item in alphabet according to the value of item.p
  * @param {Array.<Object>} Sorted array of {s:<string>, p:<probability>}
  * @param {Array.<Object>} {s:<string>, p:<probability>}
  *
  * @return {Array.<Object>} [{s:<string>, p:<probability>}]
  */
  _insertSorted(alphabet, item) {
    let index;

    if (alphabet[0].p < item.p) {
      index = 0;
    } else if (alphabet[alphabet.length - 1].p > item.p) {
      index = alphabet.length;
    } else {
      for (let i = 0; i < alphabet.length - 1 ; i++) {

        if ((alphabet[i].p > item.p) && (alphabet[i + 1].p <= item.p)) {
          index = i + 1;

          break;
        }
      } // for
    }

    alphabet.splice(index, 0, item);
  }

/**
 * Translate an array containing the frequencies
 * of the symbols in the alphabet to a new array
 * with the probabilities of each one
 *
 * @param {Array.<Object>} Array of {s: <string>, p: <counter> }
 * @return {Array.<Object>} Array of { s: <string>, p: <probability> }
 * @private
 */
  _calculateProbabilities(frequencies) {
    let total = 0;
    let alphabet = {};

    frequencies.map((item) => total += item.f);

    alphabet = frequencies.map(function (item) {
      let n = {};

      n.s = item.s;
      n.p = (item.f) / total;
      return n;
    });

    return alphabet;
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
    alphabet = this._calculateProbabilities(frequencies);

    q = frequencies.length;
    let groupsize = 2 + ((q - 2) % (D - 1));

    let alphabetSorted = alphabet.sort(this._compare);

    this.huffman(groupsize, D, alphabetSorted, code);
    return this.encoded;
  }

}
