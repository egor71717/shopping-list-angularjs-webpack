const merge = require('webpack-merge');
const commonConfiguration = require('./webpack.common.js');
const plugins = require('./plugins');
const paths = require('./paths'); 

const devConfiguration = {
    mode: 'development',
    plugins: [
        new plugins.NamedModulesPlugin(),
        new plugins.HotModuleReplacementPlugin()
    ],
    //devtool: 'inline-source-map',
    devServer: {
        contentBase: paths.directories.dist,
        hot: true
    }
}
module.exports = merge(commonConfiguration, devConfiguration);