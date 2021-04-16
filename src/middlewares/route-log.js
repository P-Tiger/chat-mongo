import { getLogger } from '../services/logger';
import moment from 'moment'
const logger = getLogger('router');

async function routeLog(req, res, next) {
  let startTime = moment().format("x")
  let sign = '<->';
  let error = null;
  try {
    await next();
  } catch (e) {
    sign = 'xxx';
    error = e;
  }
  let ms = moment().format("x") - startTime;
  logger.http(`${sign} ${req.method.toUpperCase().padStart(6, ' ')}[${error ? error.status : res.statusCode}] - ${ms}ms - ${req.url}`);
  if (null !== error) {
    res.throw(error.status, error.message);
  }
}

export default routeLog;