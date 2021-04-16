import dotenv from 'dotenv/config'
import path from 'path';

/**
 * Get config value from ENV
 * @param {String} keyName 
 * @param {Function} parseFunc Input the function that need to parse data: parseInt, parseFloat, string, JSON.parse
 */
function get_config(keyName, parseFunc) {
    if(!parseFunc)
      return process.env[keyName]
    return parseFunc(process.env[keyName])
}
const cfg = get_config

export {
  cfg,
  get_config
};

