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
		alphabet = []
		total = 0
		for key in pAlphabet
			total += key.f

		# refactor with list comprehensions?
		for key in pAlphabet
			n={}
			n.s = key.s
			n.p = (key.f)/total
			alphabet.push(n)

		q=pAlphabet.length

		groupsize = 2 + ( (q-2) % (D-1) )
		Huffman.huffman(groupsize, D, alphabet, code)
		encoded

module.exports = Huffman



# alphabet_plain = [
# 	{s:'A', f:34},
# 	{s:'B', f:12},
# 	{s:'C', f:100},
# 	{s:'D', f:45},
# 	{s:'E', f:2},
# 	{s:'F', f:5},
# 	{s:'G', f:500}]

# _code=[0,1,2]
# Huffman.encode(_code, alphabet_plain)
# console.log encoded
