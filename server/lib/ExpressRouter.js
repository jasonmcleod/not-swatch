const _ = require('lodash');

module.exports = app => {
    const controllers = require('fs').readdirSync('./server/controllers');
    _.each(controllers, controller => {
        const path = controller.replace('.js','');
        const routes = require(`../controllers/${path}`);
        _.each(routes, (func, key) => {
            if (key.indexOf(' ') > -1) {
                const method = key.split(' ')[0].toLowerCase() === 'get' ? 'get' : 'post';
                const route = key.split(' ')[1];
                app[method](`/api/${path}/${route}`, func);
            } else {
                app.get(`/api/${path}/${key}`, func);
            }
        });
    });
};