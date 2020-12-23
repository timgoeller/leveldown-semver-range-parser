const Lexer = require('./lexer')
const Parser = require('./parser')
const semver = require('semver')

class LeveldownSemverRangeParser {
  parse (range) {
    const semverRange = semver.validRange(range)
    if (!semverRange) {
      throw new Error('Not a valid semver range: ' + range.toString())
    }
    return new Parser(new Lexer(semverRange)).parse()
  }
}

module.exports = LeveldownSemverRangeParser
