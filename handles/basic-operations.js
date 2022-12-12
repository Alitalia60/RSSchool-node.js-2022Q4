import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/fmMessage.js';

/********************************************************
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
    fmMessage(err);
  }
};

/********************************************************
 * @function add
 * @param {string} newFileName - filename or full path of file to create
 */
export const add = async (newFileName) => {
  try {
    const fileURL = path.resolve(fmSettings.currentDir, newFileName);
    return await fsPromises.open(fileURL, 'wx');
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
  }
};

/********************************************************
 * @function rn
 * @param {string} pathToFile - filename or full path of file to rename
 * @param {string} newFileName - new ile name or path & new file name
 */
export const rn = async (pathToFile, newFileName) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(fmSettings.currentDir, newFileName);
  try {
    return await fsPromises.rename(oldFileURL, newFileURL);
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
  }
};

/********************************************************
 * @function cp
 * @param {string} pathToFile - filename or full path of file to rename
 * @param {string} pathToNewDir - path to destination  dir
 */
export const cp = async (pathToFile, pathToNewDir) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(
    fmSettings.currentDir,
    pathToNewDir,
    path.basename(pathToFile)
  );

  try {
    await Promise.all([
      fsPromises.stat(path.resolve(fmSettings.currentDir, pathToNewDir)),
      fsPromises.stat(oldFileURL),
    ]);
  } catch (err) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(err);
    return;
  }

  return await new Promise((res, rej) => {
    const rs = fs.createReadStream(oldFileURL);
    const ws = fs.createWriteStream(newFileURL);
    rs.pipe(ws)
      .on('error', (err) => {
        fmMessage(fmMessagesList.invalid);
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

//*****************************************
//!! DONE
export const mv = async (pathToFile, pathToNewDir) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  try {
    return await Promise.all([
      await cp(pathToFile, pathToNewDir),
      await fsPromises.rm(oldFileURL),
    ]);
  } catch (err) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(err);
  } finally {
    return;
  }
};

//*****************************************
//!! DONE
export const remove = async (pathToFile) => {
  const fileUrl = path.resolve(fmSettings.currentDir, pathToFile);
  try {
    await fsPromises.rm(fileUrl);
  } catch (err) {
    fmMessage(fmMessagesList.invalid);
    fmMessage(err);
  } finally {
    return;
  }
};
