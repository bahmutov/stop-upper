# stop-upper

> Checks that every file in the given folder is lower case

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save-dev stop-upper
```

## Use

### basic

Assuming all interesting files are in the folders "src" and "bin", I recommend create an NPM run script. Use `--folder` or `-f` to pass the folder(s) to search.

```json
{
  "scripts": {
    "stop-upper": "stop-upper --folder src --folder bin"
  }
}
```

Exits with 1 if there is a file with uppercase somewhere inside the folders. Also checks folder names.

### warn

If you just want to warn on found uppercase names, use `stop-upper --warn <folder>` syntax. Alias `-w`.

### Pre-commit or pre-push hook

If using [pre-git][pre-git] to configure Git hooks, run this tool as a command

```json
{
  "config": {
    "pre-git": {
      "pre-push": ["npm run stop-upper"]
    }
  }
}
```

See [package.json](package.json) (note here we have just local script name).

**tip** you can warn on commit hook, while fail in pre-push hook.

[pre-git]: github.com/bahmutov/pre-git#readme

### Commas

You can pass multiple folder names as separate arguments or comma-separated. These are equivalent

```
stop-upper --folder foo --folder bar
stop-upper -f foo -f bar
stop-upper -f foo,bar
```

### Debugging

You can see additional diagnostic output from this command by running with environment variable `DEBUG=stop-upper`

### CI

On CI run the tool after install, for example see [.travis.yml](.travis.yml),
(note here we have just local script name).

```
- npm run stop-upper
```

## Related

- [stop-only](https://github.com/bahmutov/stop-only)

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2018

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/stop-upper/issues) on Github

## MIT License

Copyright (c) 2018 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/stop-upper.svg?downloads=true
[npm-url]: https://npmjs.org/package/stop-upper
[ci-image]: https://travis-ci.org/bahmutov/stop-upper.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/stop-upper
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
