# node-rmrf
The rm -rf command implementation for node.

## Installation

```js
npm install node-rmrf
```

## Usage

```js
import { rmrfSync } from 'node-rmrf'
// or
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { rmrfSync } = require('node-rmrf')
```

### Command Line Interface

```
node-rmrf version 1.0.6

Usage: node-rmrf <path> [<path> ...]
Deletes all files and folders at "path", recursively.

Options:
  --                   Treat all subsequent arguments as paths
  -h, --help            Usage information
  -v, --version            The version of node-rmrf
