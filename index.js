// Generated by CoffeeScript 1.4.0
(function() {
  var alphabet_plain, code, compare, encode, encoded, huffman;

  alphabet_plain = [
    {
      s: 'A',
      f: 34
    }, {
      s: 'B',
      f: 12
    }, {
      s: 'C',
      f: 100
    }, {
      s: 'D',
      f: 45
    }, {
      s: 'E',
      f: 2
    }, {
      s: 'F',
      f: 5
    }, {
      s: 'G',
      f: 500
    }
  ];

  encoded = {};

  compare = function(a, b) {
    if (a.p > b.p) {
      return -1;
    }
    if (a.p <= b.p) {
      return 1;
    }
    return 0;
  };

  huffman = function(groupsize, D, pAlphabet) {
    var alphabet_next, c, character, i, letter, result, s, sorted, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2;
    sorted = pAlphabet.sort(compare);
    for (i = _i = 0, _ref = groupsize - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      character = sorted[sorted.length - (groupsize - i)];
      _ref1 = character.s;
      for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
        letter = _ref1[_j];
        encoded[letter] = code[i] + (encoded[letter] || "");
      }
    }
    if (pAlphabet.length === groupsize) {
      return;
    }
    alphabet_next = sorted.slice(0, +(sorted.length - 1 - groupsize) + 1 || 9e9);
    c = {
      s: '',
      p: 0
    };
    _ref2 = sorted.slice(-groupsize);
    for (_k = 0, _len1 = _ref2.length; _k < _len1; _k++) {
      s = _ref2[_k];
      c.s = c.s + s.s;
      c.p = c.p + s.p;
    }
    alphabet_next[alphabet_next.length] = c;
    return result = huffman(D, D, alphabet_next);
  };

  encode = function(code, pAlphabet) {
    var D, alphabet, groupsize, key, n, q, total, _i, _j, _len, _len1;
    D = code.length;
    alphabet = [];
    total = 0;
    for (_i = 0, _len = pAlphabet.length; _i < _len; _i++) {
      key = pAlphabet[_i];
      total += key.f;
    }
    for (_j = 0, _len1 = pAlphabet.length; _j < _len1; _j++) {
      key = pAlphabet[_j];
      n = {};
      n.s = key.s;
      n.p = key.f / total;
      alphabet.push(n);
    }
    q = pAlphabet.length;
    groupsize = 2 + ((q - 2) % (D - 1));
    return huffman(groupsize, D, alphabet);
  };

  code = [0, 1, 2];

  encode(code, alphabet_plain);

  console.log(encoded);

}).call(this);
