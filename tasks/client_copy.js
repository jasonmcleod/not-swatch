'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const watch = require('gulp-watch');
const config = require('./config').client;

module.exports = function(singleRun, callback) {
    return function() {
        const execute = function() {
            return gulp.src(config.source)
                .pipe(plumber())
                .pipe(gulp.dest(config.destination));
        };

        if (!singleRun) {
            const clientWatch = watch(config.source, { verbose: true });

            if (callback) {
                clientWatch.on('change', function(fileName) {
                    execute();
                    callback([fileName]);
                });
            }
        }

        return execute();
    };
};
