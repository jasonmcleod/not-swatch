'use strict';
const gulp = require('gulp');
const path = require('path');
const protractor = require('gulp-protractor').protractor;
const configPath = path.resolve(__dirname, './config/protractor.js');

module.exports = function() {
    return function() {
        return gulp.src(['e2e/**/*.spec.js'])
            .pipe(protractor({
                configFile: configPath
            }));
    };
};
