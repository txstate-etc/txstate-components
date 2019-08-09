
const useNoDataText = (error, defaultMessage) => {
  if (Array.isArray(error) && error.length > 0) {
    return error.reduce((acc, cur) => `${acc}\n${cur.message}`, '')
  } else if (error instanceof Error) {
    return error.message
  } else {
    return defaultMessage
  }
}

export default useNoDataText
