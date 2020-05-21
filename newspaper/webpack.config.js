const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        'app': './js/index.js',
        'styles': './sass/styles.sass'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,   // .scss or .sass
                loader: ExtractTextWebpackPlugin.extract([
                    'css-loader',
                    'sass-loader'
                ])
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: __dirname,
        publicPath: '/dist/',
        port: 8080,
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true
    }
}