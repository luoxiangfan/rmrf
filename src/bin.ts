#!/usr/bin/env node
import { createInterface } from 'readline';
import { rmrfSync } from './index.js';
import { name, version } from '../package.json';

const runHelpForUsage = () =>
  console.error(`run \`${name} --help\` for usage information`);

const help = `${name} version ${version}

Usage: ${name} <path> [<path> ...]
Deletes all files and folders at "path", recursively.

Options:
  --                   Treat all subsequent arguments as paths
  -h, --help            Usage information
  -v, --version            The version of ${name}
`;

const main = async (...args: string[]) => {
  const paths: string[] = [];
  let dashdash = false;

  for (const arg of args) {
    if (dashdash) {
      paths.push(arg);
      continue;
    }
    if (arg === '--') {
      dashdash = true;
      continue;
    } else if (arg === '-rf' || arg === '-fr') {
      continue;
    } else if (arg === '-h' || arg === '--help') {
      console.log(help);
      return 0;
    } else if (arg === '-v' || arg === '--version') {
      console.log(version);
      return 0;
    } else if (/^-/.test(arg)) {
      console.error(`unknown option: ${arg}`);
      runHelpForUsage();
      return 1;
    } else {
      paths.push(arg);
    }
  }

  if (!paths.length) {
    console.error(`${name}: must provide a path(file or directory) to remove`);
    runHelpForUsage();
    return 1;
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rmrfSync(...paths);

  rl.close();

  return 0;
};

const args = process.argv.slice(2);
main(...args).then(
  (code) => process.exit(code),
  (err) => {
    console.error(err);
    process.exit(1);
  }
);
