# Leveldown SemVer Range Parser
This parser parses semantic versioning range queries like `^1.3.4` to leveldown compliant queries like `{ gte: '001003004', lt: '002000000' }`. Note that for these queries to work, the version numbers must be in the format of `001003012` (`1.3.12`).

Pre-Release versions (such as `1.2.3-alpha.3`) and the `||` operator are not supported. 

Beware of dragons, this parser might not catch all cases yet.

## Example
```javascript
let SemverRangeParser = require('leveldown-semver-range-parser')

const parser = new SemverRangeParser()
// prints '{ gte: '001003004', lt: '002000000' }'
console.log(parser.parse('^1.3.4'))
// prints '{ gt: '001003004', lte: '004005002' }
console.log(parser.parse('>1.3.4 4.5.2'))
```
## API
#### `const parser = new SemverRangeParser`
Creates a new range parser.

#### `parser.parse(range)`
Parse the range into a leveldown query.