// missing from standard lib

// hopefully correctly implemented Multiply-with-carry pseudo random generator
// https://en.wikipedia.org/wiki/Multiply-with-carry
randomSeed = function(s) {
    var m_w  = s;
    var m_z  = 987654321;
    var mask = 0xffffffff;

    return function() {
      m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
      m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;

      var result = ((m_z << 16) + m_w) & mask;
      result /= 4294967296;

      return result + 0.5;
    }
}

random = randomSeed(2);

// hopefully correctly implemented fisher-yates shuffle
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
shuffle = function(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
}

