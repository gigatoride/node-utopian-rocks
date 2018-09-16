# node-utopian-rocks

[![npm](https://img.shields.io/npm/v/node-utopian-rocks.svg)](https://www.npmjs.com/package/node-utopian-rocks) [![GitHub license](https://img.shields.io/github/license/gigatoride/node-utopian-rocks.svg)](https://github.com/gigatoride/node-utopian-rocks/blob/master/LICENSE) [![install size](https://packagephobia.now.sh/badge?p=node-utopian-rocks@0.0.5)](https://packagephobia.now.sh/result?p=node-utopian-rocks@0.0.5)
![Utopian](https://img.shields.io/badge/powered%20by-utopian.io-ff69b4.svg)

An API wrapper for utopian.rocks.

## Installing

```cmd
npm install node-utopian-rocks
```

## Usage

First add it to your project

```js
const utopian = require('node-utopian-rocks');
```

For example retrieving posts by category and status ``Asynchronously``:

```js
await utopian.getPosts('social', 'reviewed')

```

or by using ``.then()`` method:

```js
utopian.getPosts('development', 'reviewed').then(posts => posts);
```

Or Let's run some tests:

```cmd
npm test
```

## API

### Request method aliases

``utopian.getPosts(params)``

``utopian.getModerators()``

``utopian.isModerator(param)``

``utopian.stats.getModerators(params)``

``utopian.stats.getProjects(params)``

``utopian.stats.getContributors(params)``

``utopian.stats.getModeratorsByDate(param)``

``utopian.stats.getProjectsByDate(param)``

``utopian.stats.getStaffPicksByDate(param)``

``utopian.stats.getCategoriesByDate(param)``

``utopian.stats.getTasksRequestsByDate(param)``

### Request parameters

These are the available parameters for making requests.

We will start with posts ``Array of Objects``:

```js
utopian.getPosts(category, status, author, moderator, staff_picks)
```

Any parameter can be ignored by empty string or just null

```js
utopian.getPosts(category, null, author, null, staff_picks)
```

For moderators ``array`` it should be called without any parameters.

```js
utopian.getModerators();
```

For Statistics

```js
/**
 * It will return total contributes by selected parameters
 * staff_picked should be true or false.
 * you can ignore any param by just null.
 */
utopian.stats.getContributors(category, status, staff_picked);
```

```js
/**
 * You can use a specific date like 2018-05-24 or today, weekly.
 */
utopian.stats.getProjectsByDate(specificDate);
```

## Supported Tags

the following table is the correct values  for category ``parameter``

Tag | Task tag
--|--
development | task-development
copywriting | task-copywriting
graphics | task-graphics
analysis | task-analysis
social | task-social
documentation | task-documentation
blog |
bug-hunting |
ideas |
video-tutorials |
tutorials |

## Roadmap

- Adding any upcoming API calls that will be available on [utopian.rocks](https://utopian.rocks)
- More improvements and more advanced options, configs.

## Contributing

Feel free to create any [pull requests](https://github.com/gigatoride/node-utopian-rocks/compare).

## Bugs

If there is any bug please report it by opening a [new issue](https://github.com/gigatoride/node-utopian-rocks/issues/new).
