/**
* Insert item in alphabet according to the value of item.p
* @param {Array.<Object>} Sorted array of {s:<string>, p:<probability>}
* @param {Array.<Object>} {s:<string>, p:<probability>}
*
* @return {Array.<Object>} [{s:<string>, p:<probability>}]
*/
function insertSorted(alphabet, item) {
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
};

/**
 * Compares the field 'p' (probability)
 * in the given objects
 *
 * @param {Object} a {p: <probability>,...}
 * @param {Object} b {p: <probability>,...}
 *
 * @return {Number}
 */
function compare(a, b) {
  if (a.p > b.p) {
    return -1;
  };
  if (a.p < b.p) {
    return 1;
  };
  return 0;
};

module.exports = {
  insertSorted: insertSorted,
  compare: compare
};
