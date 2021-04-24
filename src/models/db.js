import mongoose from 'mongoose';
import { cfg } from '../config';
import {
    getLogger
} from '../services/logger';
const logger = getLogger('database');
mongoose.connect(cfg("DB_LINK", String), { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const DB = mongoose.connection;
DB.on('error', (err) => {
    console.log(`(MongoDB) Unable to connect to the database: \n%o`, err)
    logger.error(`(MongoDB) Unable to connect to the database: \n%o`, err);
});
DB.once('open', function () {
    console.log(`Connection (MongoDB) has been established successfully`)
    logger.info(`Connection (MongoDB) has been established successfully.`);
});

export default DB;