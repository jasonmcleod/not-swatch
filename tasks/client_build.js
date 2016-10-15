'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const webpack = require('webpack-stream');
const util = require('gulp-util');
const config = require('./config').client;

module.exports = function(singleRun, callback) {
    return function(cb) {
        const webpackConfig = singleRun ? require('./config/webpack.dist') : require('./config/webpack');
        let webpackStream = gulp.src('./assets/javascripts/main.js')
            .pipe(plumber());
        let firstRun = true;

        const callbackOnBuild = function(err, stats) {
            if (err) {
                throw new util.PluginError('webpack:error', err);
            }

            const statistics = stats.toJson({
                children: false,
                source: false,
                modules: false,
                chunkModules: false
            });

            const elapsedTime = Math.round(statistics.time / 10) / 100;

            if (singleRun) {
                cb();
            } else {
                if (firstRun) {
                    cb();
                    firstRun = false;
                } else {
                    util.log(`webpack:build ${elapsedTime} s`);

                    callback(
                        statistics.assets.map((file) => file.name)
                    );
                }
            }
        };

        if (!singleRun) {
            webpackConfig.watch = true;
        }

        webpackStream = webpackStream
            .pipe(webpack(webpackConfig, null, callbackOnBuild))
            .pipe(gulp.dest(config.destination));
    };
};
