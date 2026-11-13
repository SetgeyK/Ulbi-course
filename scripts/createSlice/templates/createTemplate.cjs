const fs = require('fs/promises');

const createPublicApi = require('./createPublicApi.cjs');
const resolveRoots = require('../resolveRoot.cjs');
const createModel = require('./createModel.cjs');
const createUI = require('./createUI.cjs');

module.exports = async (layer, sliceName) => {
    try {
        await fs.mkdir(resolveRoots('src', layer, sliceName));
    } catch (e) {
        console.log('не удалоось создать директорию для слайса ${sliceName}', e);
    }

    await createModel(layer, sliceName);
    await createUI(layer, sliceName);
    await createPublicApi(layer, sliceName);
};
