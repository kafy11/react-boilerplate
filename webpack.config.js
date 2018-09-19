const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    const isProduction = env.production;
    const CSSExctract = new ExtractTextPlugin('styles.css');

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'js/[name].[hash].js',
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules\/(?!react-icons)/,
            }, {
                test: /\.s?css$/,
                use: CSSExctract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            new CleanWebpackPlugin(['public']),
            new HtmlWebpackPlugin({
                title: 'Websocket App',
                favicon: './images/favicon.png',
                alwaysWriteToDisk: true,
                template: 'template.html'
            }),
            CSSExctract,
            new webpack.DefinePlugin({
                BASENAME: (isProduction) ? "'/bpm/_remote_gateway'" : "'/'"
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
};