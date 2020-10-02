const {
  ALPHABET_SIZE,
  UPPERCASE_START,
  LOWERCASE_START
} = require('./settings');

const toChar = String.fromCharCode;

const absoluteShift = (charCode, shift, direction, size) => {
  const fullShift = (shift % ALPHABET_SIZE) * direction;

  if (fullShift > 0) {
    return size + ((charCode - size + fullShift) % ALPHABET_SIZE);
  }

  return (
    size + ((charCode - size + (ALPHABET_SIZE + fullShift)) % ALPHABET_SIZE)
  );
};

const caesarCipher = (src, shift, direction) => {
  const chars = src.split('');

  return chars
    .map(char => {
      const charCode = char.charCodeAt();
      if (
        charCode >= UPPERCASE_START &&
        charCode <= UPPERCASE_START + ALPHABET_SIZE
      ) {
        return toChar(
          absoluteShift(charCode, shift, direction, UPPERCASE_START)
        );
      }

      if (
        charCode >= LOWERCASE_START &&
        charCode <= LOWERCASE_START + ALPHABET_SIZE
      ) {
        return toChar(
          absoluteShift(charCode, shift, direction, LOWERCASE_START)
        );
      }

      return char;
    })
    .join('');
};

module.exports = caesarCipher;
