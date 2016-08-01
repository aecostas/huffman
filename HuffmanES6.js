"use strict";

class Huffman {

    constructor() {
	this.encoded = {};
    }
    
    compare(a,b) {
	if (a.p > b.p) {
	    return -1;
	}
	if (a.p <= b.p) {
	    return 1;
	}
	return 0
    }


    huffman (groupsize, D, pAlphabet, code) {
	let alphabet_next;
	let sorted = pAlphabet.sort(Huffman.compare);

	for (let i=0; i<groupsize; i++) {
	    console.warn(sorted+":   "+sorted.length+"   "+groupsize);
	    let character = sorted[sorted.length - (groupsize - i )];
	    for (let letter of character.s) {
		
		this.encoded[letter] = code[i] + (this.encoded[letter] || "");
	    }

	}

	// end of recursion
	if (pAlphabet.length === groupsize) {
	    return
	}

	alphabet_next = sorted.slice(0,(sorted.length - groupsize))

	// create new element from the last D ones
	let c={s:'',p:0}
	for (let s of sorted.slice(-groupsize)) {
	    c.s = c.s + s.s
	    c.p = c.p + s.p
	}
	
	alphabet_next[alphabet_next.length] = c;

	let result = this.huffman(D, D, alphabet_next, code);
	return this.encoded;
	
    }    

    encode(code, pAlphabet) {
	let D = code.length;
	let total = 0;

	/**
	 * @member {int} Number of elements of the source alphabet
	 */
	let q;

	/**
	 * @member {Array[Object]}
	 */
	let alphabet; 
	
	pAlphabet.map(
	    function(item) {
		total += item.f
	    }
	);
	
	alphabet = pAlphabet.map(function(item) {
	    let n={};
	    n.s = item.s;
	    n.p = (item.f)/total;
	    return n;
	});

	q=pAlphabet.length;
	let groupsize = 2 + ( (q-2) % (D-1) )
	this.huffman(groupsize, D, alphabet, code);
	return this.encoded;
    }

} // class


let a= new Huffman();

let alphabet_plain = [
	{s:'A', f:34},
	{s:'B', f:12},
	{s:'C', f:100},
	{s:'D', f:45},
	{s:'E', f:2},
	{s:'F', f:5},
	{s:'G', f:500}]

let code = [0, 1, 2];

let encoded = a.encode(code, alphabet_plain);

module.exports = Huffman
