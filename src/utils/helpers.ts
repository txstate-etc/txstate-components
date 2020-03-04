export const minBy = <T extends Object>(collection: Iterable<T>, field: keyof T) => {
  let min = Number.MAX_VALUE
  let returnValue = null
  for (const item of collection) {
    const value = item[field]
    if (typeof value === 'number' && value < min) {
      min = value
      returnValue = item
    }
  }

  return returnValue
}

export const filter = <T>(collection: Iterable<T>, comp: { [key in keyof Partial<T>]: any}) => {
  const filteredCollection: T[] = []
  for (const item of collection) {
    const itemKeys = Object.keys(comp) as (keyof typeof comp)[]
    let shouldPush = true
    for (const key of itemKeys) {
      if (typeof comp[key] === 'function') {
        shouldPush = comp[key](item[key])
      } else if (item[key] !== comp[key]) {
        shouldPush = false
        break
      }
    }
    if (shouldPush) {
      filteredCollection.push(item)
    }
  }

  return filteredCollection
}
