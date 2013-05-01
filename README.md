Build
-----
coffee -c Huffman.coffee
coffee -c test.coffee

Test
----
node test

Use
---
See test.coffee

Initialize an array of dictionaries. Each item has a symbol and its frequency.

alphabet_plain = [
	{s:'A', f:34},
	{s:'B', f:12},
	{s:'C', f:100},
	{s:'D', f:45},
	{s:'E', f:2},
	{s:'F', f:5},
	{s:'G', f:500}]

Declare the code to use
code=[0,1,2]

Encoded!
encoded = encoder.encode(code, alphabet_plain)
