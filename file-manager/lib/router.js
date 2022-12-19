import * as basOperations from '../handles/basic-operations.js';
import * as osOperations from '../handles/os-operations.js';
import * as hashOperations from '../handles/hash-operations.js';
import * as nwdOperations from '../handles/nwd-operations.js';
import * as compressOperations from '../handles/compress-operations.js';

export const operList = {
  up: { executeFunc: nwdOperations.upDir, minArgs: 0 },
  cd: { executeFunc: nwdOperations.changeDir, minArgs: 1 },
  ls: { executeFunc: nwdOperations.ls, minArgs: 0 },
  cat: { executeFunc: basOperations.cat, minArgs: 1 },
  add: { executeFunc: basOperations.add, minArgs: 1 },
  rn: { executeFunc: basOperations.rn, minArgs: 2 },
  cp: { executeFunc: basOperations.cp, minArgs: 2 },
  mv: { executeFunc: basOperations.mv, minArgs: 2 },
  rm: { executeFunc: basOperations.remove, minArgs: 1 },
  os: { executeFunc: osOperations.osInfo, minArgs: 1 },
  hash: { executeFunc: hashOperations.hash, minArgs: 1 },
  compress: { executeFunc: compressOperations.compress, minArgs: 1 },
  decompress: { executeFunc: compressOperations.decompress, minArgs: 1 },
};
