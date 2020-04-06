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

export const isNumber = (value: any): value is number => {
  return typeof value === 'number'
}

export const isString = (value: any): value is string => {
  return typeof value === 'string'
}

export const isArray = <T>(value: any): value is Array<T> => {
  return Array.isArray(value)
}

export const isBooleanObject = (value: any): value is { [key: string]: boolean, [key: number]: boolean } => {
  let isObject = true
  if (typeof value === 'object' && value !== null && !isArray(value)) {
    for (const key of Object.keys(value)) {
      if (typeof value[key] !== 'boolean') {
        isObject = false
      }
    }
  }
  return isObject
}

export const classNames = (...args: any[]) => {
  const classes: (string | number)[] = []
  for (const className of args) {
    if (!className) continue

    if (isNumber(className) || isString(className)) {
      classes.push(className)
    } else if (isArray(className) && className.length > 0) {
      const joinedClassNames = classNames(...className)
      if (joinedClassNames) {
        classes.push(joinedClassNames)
      }
    } else if (isBooleanObject(className)) {
      for (const key of Object.keys(className)) {
        if (className[key]) {
          classes.push(key)
        }
      }
    }
  }

  return classes.join(' ')
}

export function isModifierKey (e:KeyboardEvent) {
  return e.ctrlKey || e.altKey || e.metaKey || e.key === 'Insert'
}
