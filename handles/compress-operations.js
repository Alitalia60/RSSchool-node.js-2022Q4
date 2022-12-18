import {
  createBrotliCompress,
  createBrotliDecompress,
  constants,
} from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';

import { fmSettings, readLine } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/fmMessage.js';
import { isFileUrlTruth, isDirUrlTruth } from '../validators/isUrlTruth.js';
import { rm } from 'node:fs/promises';

/********************************************************
 * Compress file (using Brotli algorithm, should be done using Streams API)
 * @function compress
 * @param {string} sourceFile - filename or full path of file to compress
 * @param {string} [destDir] - destination path. if empty - current dir will be used
 */
export const compress = async (sourceFile, destDir = '') => {
  const sourceFileUrl = path.resolve(fmSettings.currentDir, sourceFile);
  if (!(await isFileUrlTruth(sourceFileUrl))) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`No such file ${sourceFileUrl}`);
    return;
  }

  let destDirUrl = fmSettings.currentDir;
  if (destDir) {
    destDirUrl = path.resolve(destDirUrl, destDir);
    if (!(await isDirUrlTruth(destDirUrl))) {
      fmMessage(fmMessagesList.failed);
      fmMessage(`No such directory ${destDirUrl}`);
      return;
    }
  }

  let destFileName = `${path.basename(sourceFileUrl)}.br`;
  const destFileUrl = path.resolve(destDirUrl, destFileName);

  if (await isFileUrlTruth(destFileUrl)) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`File ${destFileUrl}`, ' already exists');
    return;
  }

  try {
    console.time('Processing');
    fmMessage('Compressing, wait please...');

    await pipeline(
      createReadStream(sourceFileUrl),
      createBrotliCompress({
        params: {
          [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MIN_QUALITY,
        },
      }),
      createWriteStream(destFileUrl)
    );
    console.timeEnd('Processing');
    fmMessage('Compressing done: ', destFileUrl);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
  }
};

/********************************************************
 * Decompress file (using Brotli algorithm, should be done using Streams API)
 * @function decompress
 * @param {string} sourceFile - filename or full path of file to decompress
 * @param {string} [destDir] - destination path. if empty - current dir will be used
 */
export const decompress = async (sourceFile, destDir) => {
  const sourceFileUrl = path.resolve(fmSettings.currentDir, sourceFile);
  if (!(await isFileUrlTruth(sourceFileUrl))) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`No such file ${sourceFileUrl}`);
    return;
  }

  let destDirUrl = path.dirname(sourceFileUrl);

  if (destDir) {
    destDirUrl = path.resolve(destDirUrl, destDir);
    if (!(await isDirUrlTruth(destDirUrl))) {
      fmMessage(fmMessagesList.failed);
      fmMessage(`No such directory ${destDirUrl}`);
      return;
    }
  }

  let destFileName = path.basename(
    path.basename(sourceFileUrl, path.extname(sourceFileUrl))
  );
  const destFileUrl = path.resolve(destDirUrl, destFileName);

  if (await isFileUrlTruth(destFileUrl)) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`File ${destFileUrl}`, ' already exists');
    return;
  }

  try {
    // console.time('Processing');
    fmMessage('Unpacking, wait please...');

    await pipeline(
      createReadStream(sourceFileUrl),
      createBrotliDecompress(),
      createWriteStream(destFileUrl)
    );

    // console.timeEnd('Processing');
    fmMessage('Unpacking done: ', destFileUrl);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
    //if source file is not brotli compressed and error occurs - delete empty destDirUrl
    if (isFileUrlTruth(destFileUrl)) {
      await rm(destFileUrl);
    }
  }
};
