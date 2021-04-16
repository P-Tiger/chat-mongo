import mongoose from 'mongoose';
import {
    cfg
} from '../config';
import {
    getLogger
} from '../services/logger';
const logger = getLogger('database');
const DB = mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true, useUnifiedTopology: true });

export default DB;