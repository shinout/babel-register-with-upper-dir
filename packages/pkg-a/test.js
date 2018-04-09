
import { describe, it } from 'mocha'
import pkgA from './index.js'

describe('pkg-a', () => {
  it('contains pkg-b', () => {
      console.assert(pkgA.pkgB.name === 'pkg-b')
  })
})
