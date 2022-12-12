import { fmMessagesList } from '../lib/constants.js';
import { operList } from '../lib/router.js';
import { fmMessage } from '../lib/fmMessage.js';

export function parseAndValidate(data) {
  const [operation, ...argsArray] = data
    .trim()
    .replace(/ {1,}/g, ' ')
    .split(' ');

  if (!operList.hasOwnProperty(operation)) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(`Unknown command "${operation}"`);
    return [];
  } else if (operList[operation].minArgs > argsArray.length) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(
      `"${operation}"At last ${operList[operation].minArgs} argument(s) require`
    );
    return [];
  }
  return [operation, argsArray];
}
