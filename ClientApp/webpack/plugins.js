const webpack = require('webpack');
const plugins = {
    CleanWebpackPlugin:         require('clean-webpack-plugin'),
    HtmlWebpackPlugin:          require('html-webpack-plugin'),
    UglifyJsPlugin:             require('uglifyjs-webpack-plugin'),
    ExtractTextPlugin:          require('extract-text-webpack-plugin'),
    DefinePlugin:               webpack.DefinePlugin,
    NamedModulesPlugin:         webpack.NamedModulesPlugin,
    HotModuleReplacementPlugin: webpack.HotModuleReplacementPlugin,
    ProvidePlugin:              webpack.ProvidePlugin
}
module.exports = plugins;