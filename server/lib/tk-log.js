var util = require('util');
var http = require('http');
var moment = require('moment');
var os = require('os');
var config = require('../config');
var colors = require('colors');
//verify that we can set up this logger
if(!config || !config.logging || Object.keys(config.logging)<3) {
    console.log('\033[31m\nThe logging service is not fully configured to post logs to the DB:');
    if(!config.logging.host) console.log('   expecting a value at config.logging.host to be the hostname of the log service');
    if(!config.logging.name) console.log('   expecting a value at config.logging.name to be the name of the app');
    if(!config.logging.env) console.log('   expecting a value at config.logging.env to be a machine description');
}

//using log4net-style log levels, except for debug
var customLevels = {
    levels: {
        off: 2147483647,
        fatal: 110000,
        error: 70000,
        warn: 60000,
        info: 40000,
        debug: 30000,
        all: -2147483648
    },
    colors: {
        off: 'black',
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        all: 'black'
    },
    translations: [ 'log', 'trace', 'debug', 'info', 'warn', 'error' ]
};

var logger = require('tracer').colorConsole({
    format : "{{message}}\n" + "\└[ {{path}}:{{line}} ]".grey,
    dateformat : "HH:MM:ss.L",
    transport: [
        function(data) {
            console.log(data.output);
        },
        function (data) {

            if (!data.message) {
                data.message = 'Logged null.';
            }

            level = customLevels.levels[customLevels.translations[data.level].toLowerCase()];
            var ts = moment().toISOString();

            var payload = {
                LogLevel: level,
                LoggerName: config.logging.name,
                MachineName: os.hostname(),
                Message: data.message,
                TimeStamp: ts
            };

            var payloadString = JSON.stringify(payload);

            if(level >= config.logging.threshold) {
                queue.push(payloadString);
            }
        }
    ]
});

var queue = [];
var sendLogs = function() {

    if(queue.length > 0) {

        var subset = queue.slice(0, 1000);

        var outboundMessage = '[' + subset.join(',') + ']';

        var req = http.request({
            host: config.logging.host,
            port: 8002,
            path: '/LogServiceBulk',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': outboundMessage.length
            }
        }, function(res) {
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', function(data) { responseString += data; });
            res.on('end', function(err, data) {
                // queue.splice(0, subset.length);
                setTimeout(sendLogs, queue.length>0 ? 0 : 5000);
            });
        });

        req.on('error', function(e) {
            console.log('Failed to send log to LogService:');
            console.log(queue);
            console.log(e);
            setTimeout(sendLogs, 5000);
        });

        req.write(outboundMessage);
        req.end();

        console.log('Logged', queue.length, 'messages');

        queue.length = 0;
    } else {
        // console.log('No logs to send');
        setTimeout(sendLogs, 5000);
    }
};

setTimeout(sendLogs, 5000);

module.exports = logger;