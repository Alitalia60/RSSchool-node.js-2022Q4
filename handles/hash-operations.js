import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/fmMessage.js';
import { isFileUrlTruth } from '../validators/isUrlTruth.js';

/********************************************************
 * Calculate hash for file and print it into console
 * @function hash
 * @param {string} pathToFile - filename or full path of file to process
 */
export const hash = async (pathToFile) => {
  const fileUrl = path.resolve(fmSettings.currentDir, pathToFile);

  if (!(await isFileUrlTruth(fileUrl))) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`No such file ${fileUrl}`);
    return;
  }
  return await new Promise((res, rej) => {
    const hashFIle = createHash('sha256');
    const rs = createReadStream(fileUrl, { encoding: 'utf-8' });
    rs.on('error', (err) => {
      rej(err);
    });
    rs.on('end', () => {
      rs.destroy();
      res();
    });
    rs.pipe(hashFIle).setEncoding('hex').pipe(process.stdout);
  });
};
