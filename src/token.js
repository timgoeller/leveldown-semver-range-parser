class Token {
  GT () {
    this.type = 'GT'
    return this
  }

  GTE () {
    this.type = 'GTE'
    return this
  }

  LT () {
    this.type = 'LT'
    return this
  }

  LTE () {
    this.type = 'LTE'
    return this
  }

  NUMBER (number) {
    this.type = 'NUMBER'
    this.number = number
    this.toString = () => {
      return `NUMBER(${this.number})`
    }
    return this
  }

  DOT () {
    this.type = 'DOT'
    return this
  }

  HYPHEN () {
    this.type = 'HYPHEN'
    return this
  }

  // OR () {
  //   this.type = 'OR'
  //   return this
  // }

  // STRING (string) {
  //   this.type = 'STRING'
  //   this.string = string
  //   this.toString = () => {
  //     return `STRING(${this.string})`
  //   }
  //   return this
  // }

  WHITESPACE () {
    this.type = 'WHITESPACE'
    return this
  }

  END_OF_QUERY () {
    this.type = 'END_OF_QUERY'
    return this
  }

  toString () {
    return this.type
  }
}

module.exports = Token
