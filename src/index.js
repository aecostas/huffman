export default class Huffman {
  constructor() {
    this.encoded = {};
  }

  Compare(a, b) {
    if (a.p > b.p) {
      return -1;
    };
    if (a.p <= b.p) {
      return 1;
    };
    return 0;
  }

  huffman(groupsize, D, pAlphabet, code) {
    let alphabetNext;
    let sorted = pAlphabet.sort(Huffman.compare);

    for (let i = 0; i < groupsize; i++) {
      console.warn(sorted + ':   ' + sorted.length + '   ' + groupsize);
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
    }

    alphabetNext[alphabetNext.length] = c;

    this.huffman(D, D, alphabetNext, code);

  };

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

    alphabet = this._calculateProbabilities(frequencies);

    q = frequencies.length;
    let groupsize = 2 + ((q - 2) % (D - 1));

    this.huffman(groupsize, D, alphabet, code);
    return this.encoded;
  }

}
