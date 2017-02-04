export default class Huffman {
  constructor() {
    this.encoded = {};
  };

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
    }

    this._insertSorted(alphabetNext, c);
    this.huffman(D, D, alphabetNext, code);
  };

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
