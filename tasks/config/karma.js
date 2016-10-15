'use strict';
const path = require('path');
const coverageEnabled = process.env.COVERAGE_ENABLED === 'true';

module.exports = function(config) {
    const webpackConfig = require('./webpack.test');
    const reporters = ['mocha'];
    if (coverageEnabled) {
        reporters.push('coverage');
    }

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: path.resolve(__dirname, '../../'),

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // chai-as-promised comes before chai, because karma loads plugins in reverse
        // see: https://github.com/vlkosinov/karma-chai-as-promised
        frameworks: ['mocha', 'chai-as-promised', 'chai', 'sinon-chai'],


        // list of files / patterns to load in the browser
        files: [
            { pattern: 'client/setup.spec.js' },
            { pattern: 'client/styles/*.css', included: false, served: true }
        ],

        proxies: {
            '/styles/': '/base/client/styles/'
        },

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'client/setup.spec.js': ['webpack', 'sourcemap']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,

        coverageReporter: {
            type: 'lcov',
            dir: 'coverage',
            subdir: '.'
        },

        webpack: webpackConfig,

        webpackServer: { noInfo: true },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity,

        autoWatch: false,
        singleRun: true
    });
};
