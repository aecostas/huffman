encoded={}
Huffman =
	compare: (a,b)->
		return -1 if a.p > b.p
		return 1 if a.p <= b.p
		return 0

	huffman: (groupsize, D, pAlphabet, code)->
		sorted = pAlphabet.sort(Huffman.compare)

		for i in [0..groupsize-1]
			character = sorted[sorted.length - (groupsize - i )]

			for letter in character.s
				encoded[letter] = code[i] + (encoded[letter] or "")

		# end of recursion
		return if pAlphabet.length is groupsize

		alphabet_next = sorted[0..(sorted.length - 1 - groupsize)]

		# create new element from the last D ones
		c={s:'',p:0}
		for s in sorted[-groupsize..-1]
			c.s = c.s + s.s
			c.p = c.p + s.p

		alphabet_next[alphabet_next.length] = c

		result = Huffman.huffman(D, D, alphabet_next, code)
		encoded

	encode: (code, pAlphabet) ->
		D = code.length
		total = 0
		pAlphabet.map (item) -> total += item.f
		
		alphabet = pAlphabet.map (item) ->
			n={}
			n.s = item.s
			n.p = (item.f)/total
			n

		q=pAlphabet.length

		groupsize = 2 + ( (q-2) % (D-1) )
		Huffman.huffman(groupsize, D, alphabet, code)
		encoded

module.exports = Huffman
