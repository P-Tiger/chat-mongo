import bodyParser from 'body-parser';
import express from 'express';
import {
    cfg
} from './config';
import cors from 'cors'
import routeLog from './middlewares/route-log';

import whiteListOrigin from './middlewares/white-list-origin';
import routers from './routers';


const app = express();
app
    .use(whiteListOrigin)
    .use(routeLog)
    .use(bodyParser.json({
        type: 'application/*+json',
        onerror: function (err, ctx) {
            ctx.throw('Body parse error', 422);
        }
    }))
    .use(routers)

app.listen(cfg('APP_PORT', parseInt), cfg('APP_HOST', String));
console.info(`API Server started at http://%s:%d`, cfg('APP_HOST', String), cfg('APP_PORT', parseInt));
