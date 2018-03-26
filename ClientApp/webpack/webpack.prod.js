const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const plugins = require('./plugins');

const prodConfiguration = {
    mode: 'production',
    plugins: [
        //new plugins.UglifyJSPlugin()
    ]
}
module.exports = merge(commonConfiguration, prodConfiguration);