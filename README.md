[![Build Status](https://travis-ci.org/aecostas/investment-analyzer.svg?branch=master)](https://travis-ci.org/aecostas/investment-analyzer)

*Generate huffman encoded symbols from an alphabet and its frequencies*

### Build
```
npm install
npm run build
```

### Test
```
npm test
```

### Usage
Review test/huffman.spec.js for a complete test suite

```
let encoded;
let alphabet; // array of frequencies
let code = [0, 1, 2];

alphabet = [
		{s: 'A', f: 6},
		{s: 'B', f: 4},
		{s: 'C', f: 3},
		{s: 'D', f: 3},
		{s: 'E', f: 2},
		{s: 'F', f: 2}];

encoded = lib.encode(code, alphabet);
```

```
{ E: '20', F: '21', B: '00', C: '01', D: '02', A: '1' }
```
