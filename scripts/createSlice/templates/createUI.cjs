const fs = require('fs/promises');

const firstCharUpperCase = require('../firstCharUpperCase.cjs');
const resolveRoot = require('../resolveRoot.cjs');
const componentTemplate = require('./componentTemplate.cjs');
const styleTemplate = require('./styleTemplate.cjs');

module.exports = async (layer, sliceName) => {
    const resolvUIPath = (...segments) => resolveRoot('src', layer, sliceName, 'ui', ...segments);

    const createUIDir = async () => {
        try {
            await fs.mkdir(resolvUIPath());
        } catch (e) {
            console.log('Не удалось создать UI директорию', e);
        }
    };

    const createComponent = async () => {
        try {
            const componentName = firstCharUpperCase(sliceName);
            await fs.mkdir(resolvUIPath(componentName));
            await fs.writeFile(
                resolvUIPath(componentName, `${componentName}.tsx`),
                componentTemplate(componentName, sliceName),
            );
            await fs.writeFile(resolvUIPath(componentName, `${componentName}.module.scss`), styleTemplate(sliceName));
        } catch (e) {
            console.log('Не удалось создать компонент', e);
        }
    };

    await createUIDir();
    await createComponent();
};
