import { stat } from 'node:fs/promises';
export async function isUrlTruth(pathUrl) {
  if (!pathUrl) {
    return false;
  }
  try {
    await stat(pathUrl);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
  }
}
