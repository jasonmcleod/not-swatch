'use strict';
const path = require('path');
const configPath = path.resolve(__dirname, './config/karma.js');

module.exports = function(singleRun) {
    return function(done) {
        const KarmaServer = require('karma').Server;

        const server = new KarmaServer({
            configFile: configPath,
            singleRun: singleRun,
            autoWatch: !singleRun
        }, function(result) {
            if (result > 0) {
                return done(new Error(`Karma exited with status code ${result}`));
            }

            done();
        });
        server.start();
    };
};
