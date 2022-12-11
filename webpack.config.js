const {resolve} = require('path');

module.exports = {
    mode: "development",
    devtool: 'cheap-module-source-map',
    entry: {
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
}