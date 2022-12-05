import { stdin, stdout } from 'node:process';
import { createInterface } from 'node:readline';
import { parseCmdLine } from './utils/parseCmdLine.js';
import { fmOptions, color, messages } from './utils/constants.js';

fmOptions.currentUser = process.argv.slice(3)[0].replace('--username=', '');
console.clear();
console.log('--------------------------------------------------------');
console.log(messages.greeting);
console.log();

// process.exit(0);
const rl = createInterface({
  input: stdin,
  output: stdout,
  prompt: color.FgMagenta + 'FM > ' + color.Reset,
});

rl.prompt();
rl.on('line', (data) => {
  const cmdLine = data.trim();
  if (cmdLine === '.exit') {
    rl.close();
  }

  const cmdAndArgs = parseCmdLine(data.trim());
  // doOperation(cmdAndArgs);
  console.log(cmdAndArgs);
  showCurrentDir();
});
rl.on('close', () => stdout.write(messages.goodbye));
