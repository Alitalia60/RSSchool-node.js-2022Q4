import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/fmMessage.js';

/********************************************************
 *Read file and print it's content in console (should be done using Readable stream):
 * @function cat
 * @param {string} pathToFile - filename or full path of file to print
 */
export const cat = async (pathToFile) => {
  try {
    const fileURL = path.resolve(fmSettings.currentDir, pathToFile);
    return await new Promise((res, rej) => {
      fs.createReadStream(fileURL, 'utf-8')
        .on('error', (err) => rej(err))
        .on('close', () => res())
        .pipe(process.stdout)
        .on('error', (err) => rej(err));
    });
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`cat:' ${err}`);
  }
};

/********************************************************
 * Create empty file in current working directory:
 * @function add
 */
export const add = async (newFileName) => {
  try {
    const fileURL = path.resolve(fmSettings.currentDir, newFileName);
    return await fsPromises.open(fileURL, 'wx');
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`add:' ${err}`);
  }
};

/********************************************************
 * Rename file (content should remain unchanged):
 * @function rn
 * @param {string} pathToFile - filename or full path of file to rename
 * @param {string} newFileName - new file name
 */
export const rn = async (pathToFile, newFileName) => {
  if (path.dirname(newFileName) !== '.') {
    fmMessage(fmMessagesList.invalid);
    fmMessage('rn: Second argument must be a file name, not a path');
    return;
  }

  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(path.dirname(oldFileURL), newFileName);
  try {
    return await fsPromises.rename(oldFileURL, newFileURL);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`rn:' ${err}`);
  }
};

/********************************************************
 * Copy file (should be done using Readable and Writable streams):
 * @function cp
 * @param {string} pathToFile - filename or full path of file to rename
 * @param {string} pathToNewDir - path to destination  dir
 */
export const cp = async (pathToFile, pathToNewDir) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(
    path.dirname(oldFileURL),
    pathToNewDir,
    path.basename(oldFileURL)
  );

  try {
    await Promise.all([
      fsPromises.stat(path.resolve(fmSettings.currentDir, pathToNewDir)),
      fsPromises.stat(oldFileURL),
    ]);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`cp:' ${err}`);
    return;
  }

  return await new Promise((res, rej) => {
    const rs = fs.createReadStream(oldFileURL);
    const ws = fs.createWriteStream(newFileURL);
    rs.pipe(ws)
      .on('error', (err) => {
        fmMessage(fmMessagesList.failed);
        fmMessage(err);
        rej(err);
      })
      .on('close', () => {
        rs.destroy();
        ws.destroy();
        res();
      });
  });
};

/********************************************************
 * Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams):
 * @function mv
 * @param {string} pathToFile - filename or full path of file to move
 * @param {string} pathToNewDir - path to destination  dir
 */

export const mv = async (pathToFile, pathToNewDir) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(path.dirname(oldFileURL), pathToNewDir);

  try {
    return await Promise.all([
      await cp(oldFileURL, newFileURL),
      await fsPromises.rm(oldFileURL),
    ]);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`mv:' ${err}`);
  } finally {
    return;
  }
};

/********************************************************
 * Delete file:
 * @function remove
 * @param {string} pathToFile - filename or full path of file to delete
 */

export const remove = async (pathToFile) => {
  const fileUrl = path.resolve(fmSettings.currentDir, pathToFile);
  try {
    await fsPromises.rm(fileUrl);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(`rm:' ${err}`);
  } finally {
    return;
  }
};
