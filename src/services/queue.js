import Queue from 'bee-queue';
import CONFIG from '../config';
import {getLogger} from './logger';
const logger = getLogger('BEE-QUEUE');
let all_queues = {}

function makeQueue(name, config) {
  if (all_queues.hasOwnProperty(name)){
    return all_queues[name];
  }
  config = config || {};
  config = Object.assign({
    prefix: CONFIG.REDIS.prefix+':bq:',
    redis: {
      host: CONFIG.REDIS.host,
      port: CONFIG.REDIS.port,
      db: CONFIG.REDIS.db
    },
    isWorker: true
  }, config);
  const queue = new Queue(name, config);
  queue.on('error', (err)=>{
    logger.error('A queue error happened %s', err.message);
  });
  all_queues[name] = queue;  
  return queue;
}

export default makeQueue;
