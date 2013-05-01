encoder = require "./Huffman"

alphabet_plain = [
	{s:'A', f:34},
	{s:'B', f:12},
	{s:'C', f:100},
	{s:'D', f:45},
	{s:'E', f:2},
	{s:'F', f:5},
	{s:'G', f:500}]

code=[0,1,2]
encoded = encoder.encode(code, alphabet_plain)
console.log encoded

