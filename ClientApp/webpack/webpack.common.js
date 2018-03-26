const plugins = require('./plugins.js');
const paths = require('./paths.js');

const commonConfiguration = {
    entry: {
        main: paths.bootstrap
    },
    output: {
        filename: '[name].bundle.js',
        path: paths.directories.dist
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                loader: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style', 'css')
            // },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options:{
                        name: '[name].[ext]',
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: require.resolve('angular'),
                loader: 'exports-loader?window.angular'
            }
        ]   
    },
    plugins: [
        new plugins.CleanWebpackPlugin([paths.directories.dist]),
        new plugins.HtmlWebpackPlugin({ template: paths.indexHtml }),
        new plugins.ProvidePlugin({
            'angular': 'angular',
        }),
        //new plugins.ExtractTextPlugin('bundle.css')
    ]
};
module.exports = commonConfiguration;