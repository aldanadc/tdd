import { describe, expect, it } from "vitest"; 

const canChangeGift =  (from, to) => {
  // if (from == undefined) throw new Error('from is required')
  if (typeof from != 'string') throw new Error('from should be a string')
  if (typeof to != 'string') throw new Error('to should be a string')

  const hasSameLength = from.length == to.length
  if (!hasSameLength) return false
  const hasSameNumberUniqueLetters = new Set(from).size == new Set(to).size
  if (!hasSameNumberUniqueLetters) return false

  const transformations = {}

  for (let i = 0; i < from.length; i++) {
    const fromLetter = from[i]
    const toLetter = to[i]

    const storedLetter = transformations[fromLetter]
    if (storedLetter && storedLetter != toLetter) return false

    transformations[fromLetter] = toLetter
  }

  return true
}

describe('canChangeGift', () => {
  // it('should be a function', () => {
  //   expect(canChangeGift).toBeTypeOf('function')
  // })
  it('should throw if first param is missing', () => {
    expect(() => canChangeGift()).toThrow()
  })
  it('should throw if first param is not a string', () => {
    expect(() => canChangeGift(2)).toThrow()
  })
  it('should throw if second param is not a string', () => {
    expect(() => canChangeGift('lala')).toThrow()
  })
  it('should return a boolean', () => {
    expect(canChangeGift('lala', 'lele')).toBeTypeOf('boolean')
  })
  it('should return false if strings provided are not of the same length', () => {
    expect(canChangeGift('abc', 'defg')).toBe(false)
  })
  it('should return false if strings provided have different number of unique letters', () => {
    expect(canChangeGift('abc', 'ddf')).toBe(false)
  })
  it('should return false if strings have different transformation order', () => {
    expect(canChangeGift('XBOX', 'XXBO')).toBe(false)
  })

})