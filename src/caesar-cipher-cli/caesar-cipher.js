const { Transform } = require('stream');

const {
  ALPHABET_SIZE,
  UPPERCASE_START,
  LOWERCASE_START
} = require('./settings');

const toChar = String.fromCharCode;

const absoluteShift = (charCode, shift, action, size) => {
  const direction = action === 'encode' ? 1 : -1;
  const fullShift = (shift % ALPHABET_SIZE) * direction;

  if (fullShift > 0) {
    return size + ((charCode - size + fullShift) % ALPHABET_SIZE);
  }

  return (
    size + ((charCode - size + (ALPHABET_SIZE + fullShift)) % ALPHABET_SIZE)
  );
};

const caesarCipher = (src, shift, action) => {
  const chars = src.split('');

  return chars
    .map(char => {
      const charCode = char.charCodeAt();
      if (
        charCode >= UPPERCASE_START &&
        charCode <= UPPERCASE_START + ALPHABET_SIZE
      ) {
        return toChar(absoluteShift(charCode, shift, action, UPPERCASE_START));
      }

      if (
        charCode >= LOWERCASE_START &&
        charCode <= LOWERCASE_START + ALPHABET_SIZE
      ) {
        return toChar(absoluteShift(charCode, shift, action, LOWERCASE_START));
      }

      return char;
    })
    .join('');
};

class CaesarCipherTransform extends Transform {
  constructor(opt) {
    super(opt);

    this._shift = opt.shift;
    this._action = opt.action;
  }

  _transform(chunk, encoding, callback) {
    try {
      const result = caesarCipher(chunk.toString(), this._shift, this._action);

      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  }
}

module.exports = CaesarCipherTransform;
