'use strict';

module.exports = {
    client: {
        source: ['client/**/*.{html,css,ico,eot,ttf,woff,woff2,svg,png,jpg,jpeg,gif}', '!**/app/**'],
        destination: 'dist/client',
        app: ['client/**/*.js']
    },
    server: {
        source: ['server/**/*.{js,json}', '!server/**/*.spec.*'],
        destination: 'dist/server'
    },
    general: {
        source: ['package.json'],
        destination: 'dist'
    },
    liveReload: {
        port: 35729
    },
    build: {
        destination: 'dist'
    }
};
