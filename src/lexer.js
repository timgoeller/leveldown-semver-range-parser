const PeekableArrayIterator = require('peekable-array-iterator')
const Token = require('./token')

class Lexer {
  constructor (query) {
    this.query = new PeekableArrayIterator(query)
    this.index = 0
  }

  getTokenIterator () {
    let currentItResult = this.query.next()
    const tokens = []
    while (!currentItResult.done) {
      // this._removeWhitespace(currentItResult.value)
      const token = this._classifyToken(currentItResult.value)
      if (token.type !== 'WHITESPACE') {
        tokens.push(token)
      }
      currentItResult = this.query.next()
    }
    tokens.push(new Token().END_OF_QUERY())

    return new PeekableArrayIterator(tokens)
  }

  _classifyToken (token) {
    switch (token) {
      case '>':
        if (this.query.peek.next().value === '=') {
          this._consumeNext()
          return new Token().GTE()
        }
        return new Token().GT()
      case '<':
        if (this.query.peek.next().value === '=') {
          this._consumeNext()
          return new Token().LTE()
        }
        return new Token().LT()
      case '-':
        return new Token().HYPHEN()
      case '.':
        return new Token().DOT()
      // case '|':
      //   if (this.query.peek.next().value === '|') {
      //     this._consumeNext()
      //     return new Token().OR()
      //   }
      //   throw Error() // this should never ever happen
      default:
        if (isNumber(token)) {
          return this._number(token)
        } else if (token === ' ') {
          return new Token().WHITESPACE()
        }
        throw new Error('Unsupported value encountered during lexing')
    }
  }

  _number (token) {
    let number = token

    while (isNumber(this.query.peek.next().value)) {
      number = number.concat(this.query.next().value)
    }

    return new Token().NUMBER(parseInt(number))
  }

  _string (token) {
    let string = token
    let peek = this.query.peek.next().value
    while (peek !== ' ') {
      string = string.concat(this.query.next().value)
      peek = this.query.peek.next().value
    }

    return new Token().STRING(string)
  }

  _consumeNext () {
    this.query.next()
  }
}

function isNumber (string) {
  return (!isNaN(string) && string !== ' ')
}

module.exports = Lexer
