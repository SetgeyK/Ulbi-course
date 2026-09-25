const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const firstCharUpperCase = require('../firstCharUpperCase')
const componentTemplate = require('./componentTemplate')
const styleTemplate = require('./styleTemplate')

module.exports = async (layer, sliceName) => {
    const resolvUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments)

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolvUIPath())
        } catch (e) {
            console.log('Не удалось создать UI директорию', e)
        }
    }

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName)
            await fs.mkdir(resolvUIPath(componentName))
            await fs.writeFile(
                resolvUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName, sliceName)
            )
            await fs.writeFile(
                resolvUIPath(componentName, `${componentName}.module.scss`),
                styleTemplate(sliceName)
            )
        } catch (e) {
            console.log('Не удалось создать компонент', e)
        }
    }

    await createUIDir()
    await createComponent()
}