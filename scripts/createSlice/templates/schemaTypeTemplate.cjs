const firstCharUpperCase = require('../firstCharUpperCase.cjs');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {

}`;
