import { minBy, filter, classNames } from './helpers'

describe('minBy tests', () => {
  it('should find the minimum object in a collection of objects', () => {
    const people = [
      { name: 'Pedro', age: 34 },
      { name: 'Alejandro', age: 22 },
      { name: 'Felix', age: 58 },
      { name: 'Miguel', age: 4 },
      { name: 'Luis', age: 88 }
    ]

    const youngestPerson = minBy(people, 'age')
    expect(youngestPerson).toEqual(people[3])
  })

  it('should return the first minimum enountered when in a collection', () => {
    const people = [
      { name: 'Pedro', age: 34 },
      { name: 'Alejandro', age: 22 },
      { name: 'Felix', age: 58 },
      { name: 'Miguel', age: 4 },
      { name: 'Franzibard', age: 4 },
      { name: 'Luis', age: 88 }
    ]
    const youngestPerson = minBy(people, 'age')
    expect(youngestPerson).toEqual(people[3])
  })
})

describe('filter tests', () => {
  it('should filter people who are 4 years old', () => {
    const people = [
      { name: 'Pedro', age: 34 },
      { name: 'Alejandro', age: 22 },
      { name: 'Felix', age: 58 },
      { name: 'Miguel', age: 4 },
      { name: 'Franzibard', age: 4 },
      { name: 'Luis', age: 88 }
    ]

    const fourYearOlds = filter(people, { age: 4 })

    expect(fourYearOlds).toEqual(people.slice(3, 5))
  })

  it('should filter everyone under 40', () => {
    const people = [
      { name: 'Pedro', age: 34 },
      { name: 'Alejandro', age: 22 },
      { name: 'Felix', age: 58 },
      { name: 'Miguel', age: 4 },
      { name: 'Franzibard', age: 4 },
      { name: 'Luis', age: 88 }
    ]

    const underForties = filter(people, { age: (value: number) => value < 40 })

    expect(underForties.length).toEqual(4)
  })
})

describe('classnames tests', () => {
  it('should combine multiple string classes', () => {
    expect(classNames('one', 'two', 'three')).toEqual('one two three')
  })

  it('should ignore undefined and null entries', () => {
    expect(classNames('one', null, 'two', undefined, 'three')).toEqual('one two three')
  })

  it('should return empty string "" for undefined and null entries', () => {
    expect(classNames(null, undefined, [null, null], [undefined])).toEqual('')
  })

  it('should return empty string "" for empty arrays', () => {
    expect(classNames([[[]]], [[]], [])).toEqual('')
  })

  it('should return classNames using objects and booleans', () => {
    expect(classNames('one', { two: true }, { three: false })).toEqual('one two')
  })

  it('should return classNames using nested arrays of objects', () => {
    expect(classNames([{ one: false }], [[{ two: true }, { two: false }], [{ one: true }]], { three: undefined }, undefined)).toEqual('two one')
  })

  it('should return classNames using objects with multiple keys', () => {
    expect(classNames({ one: true, two: true }, ['three'], 4)).toEqual('one two three 4')
  })
})
