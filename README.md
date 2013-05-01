**Generate huffman encoded symbols from an alphabet and its frequencies**

### Build
```
coffee -c Huffman.coffee
coffee -c test.coffee
```

### Test
node test

### Usage
See test.coffee

Initialize an array of dictionaries. Each item has a symbol and its frequency.
```
alphabet_plain = [
	{s:'A', f:34},
	{s:'B', f:12},
	{s:'C', f:100},
	{s:'D', f:45},
	{s:'E', f:2},
	{s:'F', f:5},
	{s:'G', f:500}]
```
Declare the code to use
```
code=[0,1,2]
```

Encode!
```
encoded = encoder.encode(code, alphabet_plain)
```