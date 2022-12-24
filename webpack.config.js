const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    // devtool: 'cheap-module-source-map',
    devtool: 'source-map',
    entry: {
        popup: './src/pages/popup.ts',
        main: './src/main.ts',
    },
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: 'ts-loader',
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/pages/popup.html",
            filename: "popup.html",
            chunks: ["popup"],
        }),
        new CopyPlugin({
            patterns: [{
                from: "public",
                to: ".",
            }],
        }),
        new CleanWebpackPlugin(),
    ],
}
