var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './build/app.js',
    output: {
        path: __dirname,
        filename: './build/app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};