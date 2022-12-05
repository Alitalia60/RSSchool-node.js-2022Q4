export const parseCmdLine = (inputLine) => {
  // console.log(inputLine);
  return inputLine.split(' ');
};

export const operList = {
  up: { action: dirAction.upFolder, minArgs: 0 },
  cd: { action: dirAction.changeFolder, minArgs: 1 },
  ls: { action: fsAction.ls, minArgs: 0 },
  cat: { action: fsAction.cat, minArgs: 1 },
  add: { action: fsAction.add, minArgs: 1 },
  rn: { action: fsAction.rn, minArgs: 2 },
  cp: { action: fsAction.cp, minArgs: 2 },
  mv: { action: fsAction.mv, minArgs: 2 },
  rm: { action: fsAction.remove, minArgs: 1 },
  os: { action: osAction.osInfo, minArgs: 1, prefix: '--' },
  hash: { action: hashAction.hash, minArgs: 1 },
  compress: { action: zipAction.compress, minArgs: 1 },
  decompress: { action: zipAction.decompress, minArgs: 1 },
};
