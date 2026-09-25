const fs = require('fs/promises')
const resolveRoots = require('../resolveRoot')
const createModel = require('./createModel')
const createUI = require('./createUI')
const createPublicApi = require('./createPublicApi')

module.exports = async (layer, sliceName) => {
    try {
        await fs.mkdir(resolveRoots('src', layer, sliceName))
    } catch (e) {
        console.log('не удалоось создать директорию для слайса ${sliceName}', e)
    }

    await createModel(layer, sliceName)
    await createUI(layer, sliceName)
    await createPublicApi(layer, sliceName)
}
