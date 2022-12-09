import { fmMessagesList } from '../lib/constants.js';
import { operList } from '../lib/router.js';
import { fmMessage } from '../lib/utils.js';

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
      `"${operation}" require ${operList[operation].minArgs} argument(s)`
    );
    return [];
  } else if (
    operList[operation].prefix &&
    operList[operation].prefix !== '--'
  ) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(`"${operation}" require argument(s) with prefix "--"`);
    return [];
  }

  return [operation, argsArray];
}
