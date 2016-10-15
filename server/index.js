GLOBAL.logger = require('./lib/tk-log');
const path = require('path');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const channelManager = require('./lib/channelManager');
const app = express();

app.use(express.static(config.staticPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const session = require('express-session');
const RedisStore = require('connect-redis')(session);

app.use(session({
    store: new RedisStore({
        host: config.session.host,
        port: config.session.port
    }),
    name: config.session.cookieName,
    secret: config.session.secret,
    saveUninitialized: true,
    resave: false,
    disableTTL: true,
    cookie: { maxAge: 14400000 } //4 hours
}));

require('./lib/ExpressMiddleware')(app);
require('./lib/ExpressRouter')(app);

// rewrite url if it does not include /api/

app.use((req, res, next) => {
    if (req.originalUrl.indexOf('/api/') > -1) return next();
    res.sendFile(path.resolve('./client/index.html'));
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    logger.info(`Interstitial Tool node.js app listening on port ${port}!`);
});