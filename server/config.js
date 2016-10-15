'use strict';
const path = require('path');
const environment = process.env.NODE_ENV || 'production';

// const localStaticPath = environment === 'production' ? '../client' : '../dist/client';
const localStaticPath = '../dist/client';
module.exports = {
    env: environment,
    enableMock:true,
    port: process.env.PORT || 9000,
    staticPath: path.resolve(__dirname, localStaticPath),
    jwt_secret: process.env.JWT_SECRET || 'angular2-secret',
    session: {
        cookieName: 'tkobd',
        host: '10.14.61.20',
        port: 6379,
        secret: 'd7vz8420n8h5a838u4307rhl4wyuo31p'
    },
    rmq: {
        // host: '10.20.80.158', login: 'phoenix', password: 'TKdev1', heartbeat: 600
        // host: '10.200.200.117', login: 'phoenix', password: 'TKdev1', heartbeat: 60
        host: '172.19.3.31', heartbeat: 60
        // host: '10.13.70.120', heartbeat:60, login:'test', password:'guest'//Ramu
        // host: '10.13.66.110', heartbeat:60, login:'test', password:'test'//This is mine
        // host: '192.168.0.45', heartbeat:60, login:'testuser', password:'guest'//This is mine jk, its yours
        // host: '10.13.66.168', heartbeat:60, login:'test', password:'test'// Mohammed
    // host: '10.13.70.132', heartbeat:60, login:'testuser', password:'guest'//Manjuanand
    },
    logging:{
        host:'internal-logservice-lb-1792515749.us-east-1.elb.amazonaws.com',
        env:'osx/node.js',
        name:'PhoenixWeb',
        exceptions:false,
        threshold:30000
    }
};
