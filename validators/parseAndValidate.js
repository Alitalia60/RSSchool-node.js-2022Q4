import { fmMessagesList } from '../lib/constants.js';
import { operList } from '../lib/router.js';
import { fmMessage } from '../lib/fmMessage.js';

/********************************************************
 * Get command line, checks if it is correct and validate arguments list
 * @function parseAndValidate
 * @param {string} data - command line : command and list of arguments
 * @returns {Array[string]} - operation and arguments list
 *  */
export function parseAndValidate(data) {
  let [operation, ...argsArray] = data.trim().split(' ');
  let argsLine = argsArray.join(' ');

  if (argsLine.includes('"')) {
    let quotasFound = [...argsLine.matchAll(/["]/g)].length;
    if (quotasFound % 2 > 0) {
      fmMessage(fmMessagesList.invalid);
      fmMessage(`Unpaired quotes passed`);
      return [];
    }
    argsArray = argsLine.split('"');
    argsArray = argsArray.map((item) => item.trim());
  } else {
    argsArray = argsLine.split(' ');
  }

  argsArray = argsArray.filter((item) => !!item);

  if (!operList.hasOwnProperty(operation)) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(`Unknown command "${operation}"`);
    return [];
  } else if (operList[operation].minArgs > argsArray.length) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(
      `"${operation}" At last ${operList[operation].minArgs} argument(s) required`
    );
    return [];
  }
  return [operation, ...argsArray];
}
