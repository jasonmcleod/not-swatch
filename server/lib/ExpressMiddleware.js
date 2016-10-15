const _ = require('lodash');

module.exports = app => {
    const middleware = require('fs').readdirSync('./server/middleware');
    _.each(middleware, controller => {
        const path = controller.replace('.js','');
        const mw = require(`../middleware/${path}`);
        mw(app);
    });
};