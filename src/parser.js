const lexint = require('lexicographic-integer')

class Parser {
  constructor (lexer) {
    this.lexer = lexer.getTokenIterator()
  }

  parse () {
    const versions = []

    let token = this.lexer.next()
    while (token.value.type !== 'END_OF_QUERY') {
      versions.push(this._parseVersion(token))
      token = this.lexer.next()
    }

    if (versions.length > 1) {
      const leftmostVer = versions[0]
      const rightmostVer = versions[versions.length - 1]

      const query = {}

      if (leftmostVer.ineqOp === 'GT') {
        query.gt = leftmostVer.lexicographicSemver
      } else {
        query.gte = leftmostVer.lexicographicSemver
      }

      if (rightmostVer.ineqOp === 'LT') {
        query.lt = rightmostVer.lexicographicSemver
      } else {
        query.lte = rightmostVer.lexicographicSemver
      }
      return query
    } else {
      switch (versions[0].ineqOp) {
        case 'GT':
          return { gt: versions[0].lexicographicSemver }
        case 'GTE':
          return { gte: versions[0].lexicographicSemver }
        case 'LT':
          return { lt: versions[0].lexicographicSemver }
        case 'LTE':
          return { lte: versions[0].lexicographicSemver }
        default:
          return {
            gte: versions[0].lexicographicSemver,
            lte: versions[0].lexicographicSemver
          }
      }
    }
  }

  _parseVersion (token) {
    const first = token.value
    let ineqOp
    let major

    if (['GT', 'GTE', 'LT', 'LTE'].includes(first.type)) {
      ineqOp = first.type
      major = this.lexer.next().value.number
    } else {
      major = first.number
    }

    this.lexer.next()
    const minor = this.lexer.next().value.number
    this.lexer.next()
    const bugfix = this.lexer.next().value.number

    if (this.lexer.peek.next().value.type === 'HYPHEN') {
      this.lexer.next()
      this.lexer.next()
    }

    return new Version(major, minor, bugfix, ineqOp)
  }
}

class Version {
  constructor (major, minor, bugfix, ineqOp = 'EQ') {
    this.major = major
    this.minor = minor
    this.bugfix = bugfix
    this.ineqOp = ineqOp
  }

  get lexicographicSemver () {
    return this.major.toString().padStart(3, '0') +
      this.minor.toString().padStart(3, '0') +
      this.bugfix.toString().padStart(3, '0')
  }
}

module.exports = Parser
