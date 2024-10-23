function defaultTemplate ({ imports, componentName, props, jsx, exports }, { tpl }) {
  return tpl`${imports}
    export const ${componentName} = (${props}) => ${jsx}
  `
}

module.exports = defaultTemplate
