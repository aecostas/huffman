

alphabet_plain = [
	{s:'A', f:34},
	{s:'B', f:12},
	{s:'C', f:100},
	{s:'D', f:45},
	{s:'E', f:2},
	{s:'F', f:5},
	{s:'G', f:500}]

# alphabet=[
# 	{s:'A', p:0.2 },
# 	{s:'B', p:0.2 },
# 	{s:'C', p:0.15 },
# 	{s:'D', p:0.15 },
# 	{s:'E', p:0.1 },
# 	{s:'F', p:0.1 },
# 	{s:'G', p:0.1 }]

# alphabet2=[
# 	{s:'A', p:0.3 },
# 	{s:'B', p:0.2 },
# 	{s:'C', p:0.15 },
# 	{s:'D', p:0.15 },
# 	{s:'E', p:0.1 },
# 	{s:'F', p:0.1 }]

# q = alphabet.length
# q2 = alphabet2.length

encoded={}

compare = (a,b)->
	return -1 if a.p > b.p
	return 1 if a.p <= b.p
	return 0

huffman = (groupsize, D, pAlphabet)->
	sorted = pAlphabet.sort(compare)

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

	result = huffman(D, D, alphabet_next)


encode = (code, pAlphabet) ->
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
	huffman(groupsize, D, alphabet)

# groupsize = 2 + ( (q-2) % (D-1) )
# huffman(groupsize,D, alphabet)

# console.log encoded

# groupsize = 2 + ( (q2-2) % (D-1) )
# huffman(groupsize,D, alphabet2)

code=[0,1,2]
encode(code, alphabet_plain)
console.log encoded

