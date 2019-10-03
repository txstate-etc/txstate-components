function defaultTemplate (
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) {
  return template.ast`${imports}
export const ${componentName} = (${props}) => ${jsx}
`
}

module.exports = defaultTemplate
