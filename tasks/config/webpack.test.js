'use strict';
const webpack = require('webpack');
const config = require('./webpack');

config.plugins = [
    new webpack.DefinePlugin({
        ENVIRONMENT: JSON.stringify('test')
    })
];
config.devtool = 'inline-cheap-source-map';

module.exports = config;
