'use strict';
const gulp = require('gulp');
const runSequence = require('run-sequence');

const clientCopyTask = require('./tasks/client_copy');
const clientBuildTask = require('./tasks/client_build');
const clientTestTask = require('./tasks/client_test');
const stylesheetTask = require('./tasks/stylesheet');
const liveReloadTask = require('./tasks/livereload');
const serverStartTasks = require('./tasks/server_start');
// const serverCopyTask = require('./tasks/server_copy');
// const generalCopyTask = require('./tasks/general_copy');
const cleanTask = require('./tasks/clean');
const protractorTask = require('./tasks/protractor');
const eslintTask = require('./tasks/eslint');

gulp.task('server-start', serverStartTasks());
// gulp.task('server-copy-dist', serverCopyTask());

// gulp.task('general-copy-dist', generalCopyTask());

gulp.task('livereload', liveReloadTask());

gulp.task('client-copy', clientCopyTask(false, liveReloadTask.notifyChanged));
gulp.task('client-copy-dist', clientCopyTask(true));
gulp.task('client-build', clientBuildTask(false, liveReloadTask.notifyChanged));
gulp.task('client-build-dist', clientBuildTask(true));
gulp.task('client-test', clientTestTask(true));
gulp.task('client-test-dev', clientTestTask(false));
gulp.task('client-stylesheet', stylesheetTask(false, liveReloadTask.notifyChanged));
gulp.task('client-stylesheet-dist', stylesheetTask(true));
gulp.task('client-lint', eslintTask());

gulp.task('clean', cleanTask());

gulp.task('serve', function(done) {
    runSequence(
        'clean', ['client-build', 'client-copy', 'client-stylesheet', 'livereload'],
        'server-start',
        done
    );
});

gulp.task('assets', function(done) {
    runSequence(
        'clean', ['client-build', 'client-copy', 'client-stylesheet', 'livereload'],
        done
    );
});

gulp.task('test', function(done) {
    runSequence(
        'client-test',
        // 'client-lint',
        done
    );
});

gulp.task('tdd', function(done) {
    runSequence(
        'client-test-dev',
        done
    );
});

gulp.task('test-e2e', protractorTask());

gulp.task('dist', function(done) {
    runSequence(
        'clean', ['client-build-dist', 'client-copy-dist', 'client-stylesheet-dist'], /* 'server-copy-dist', 'general-copy-dist' */
        done
    );
});
