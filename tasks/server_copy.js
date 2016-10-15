'use strict';
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const config = require('./config').server;

module.exports = function() {
    return function() {
        return gulp.src(config.source)
            .pipe(plumber())
            .pipe(gulp.dest(config.destination));
    };
};
