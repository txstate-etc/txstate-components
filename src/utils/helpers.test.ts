import { minBy, filter } from './helpers'

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
