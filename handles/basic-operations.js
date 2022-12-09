import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

import { fmSettings } from '../fm.js';
import { fmMessagesList } from '../lib/constants.js';
import { fmMessage } from '../lib/utils.js';

//*****************************************
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

//*****************************************
export const add = async (newFileName) => {
  try {
    const fileURL = path.resolve(fmSettings.currentDir, newFileName);
    return await fsPromises.open(fileURL, 'wx');
  } catch (err) {
    fmMessage(fmMessagesList.failed);
    fmMessage(err);
  }
};

//*****************************************
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

//*****************************************
export const cp = async (pathToFile, pathToNewDir) => {
  const oldFileURL = path.resolve(fmSettings.currentDir, pathToFile);
  const newFileURL = path.resolve(
    fmSettings.currentDir,
    pathToNewDir,
    pathToFile
  );

  await fsPromises.stat(oldFileURL).then(
    (stats) => {
      if (stats.isDirectory()) {
        fmMessage(fmMessagesList.invalid);
        fmMessage(`${pathToFile} is directory`);
        return;
      }
    },
    (err) => {
      fmMessage(fmMessagesList.invalid);
      fmMessage(err);
      return;
    }
  );

  await fsPromises.stat(path.resolve(fmSettings.currentDir, pathToNewDir)).then(
    (stats) => {
      if (!stats.isDirectory()) {
        fmMessage(fmMessagesList.invalid);
        fmMessage(`${newFileURL} is NOT directory`);
        return;
      }
    },
    (err) => {
      fmMessage(fmMessagesList.invalid);
      fmMessage(err);
      return;
    }
  );

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
        res();
      });
  });
};

//*****************************************
export const mv = (pathToFile, pathToNewDir) => {
  console.log('not implemented');
};

//*****************************************
export const remove = (pathToFile) => {
  console.log('not implemented');
};
