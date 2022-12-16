import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream';

import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/fmMessage.js';
import { isFileUrlTruth, isDirUrlTruth } from '../validators/isUrlTruth.js';

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

  let destDirUrl = path.dirname(sourceFileUrl);
  if (destDir) {
    destDirUrl = path.resolve(destDirUrl, destDir);
    if (!(await isDirUrlTruth(destDirUrl))) {
      fmMessage(fmMessagesList.invalid);
      fmMessage(`No such directory ${destDirUrl}`);
      return;
    }
  }

  let destFileName = path.basename(path.basename(sourceFileUrl) + '.br');
  if (!destFileName) {
    destFileName = path.basename(sourceFile) + '.br';
  }
  try {
    const destFileUrl = path.resolve(destDirUrl, destFileName);
    const pack = createBrotliCompress();
    const source = createReadStream(sourceFileUrl);
    const destination = createWriteStream(destFileUrl);
    source.pipe(pack).pipe(destination);
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
    fmMessage(fmMessagesList.invalid);
    fmMessage(`No such file ${sourceFileUrl}`);
    return;
  }

  let destDirUrl = path.dirname(sourceFileUrl);
  if (destDir) {
    destDirUrl = path.resolve(destDirUrl, destDir);
    if (!(await isDirUrlTruth(destDirUrl))) {
      fmMessage(fmMessagesList.invalid);
      fmMessage(`No such directory ${destDirUrl}`);
      return;
    }
  }

  let destFileName = path.basename(
    path.basename(sourceFileUrl, path.extname(sourceFileUrl))
  );

  try {
    const destFileUrl = path.resolve(destDirUrl, destFileName);
    const unPack = createBrotliDecompress();
    const source = createReadStream(sourceFileUrl);
    const destination = createWriteStream(destFileUrl);
    source.pipe(unPack).pipe(destination);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
  }
};
