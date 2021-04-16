import { cfg } from '../config';
import cors from 'cors';

function checkOriginAgainstWhitelist(origin, callback) {
  if (cfg('WHITELIST', JSON.parse).includes('*')) {
    callback(null, true)
  } else {
    callback(new Error('Not allowed by CORS'))
  }
}

export default cors({
  origin: checkOriginAgainstWhitelist
});