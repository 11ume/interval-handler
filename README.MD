

<br>
<br>
<br>

**Interval Handler** — Is a really simple interval controller utility ⏱️

<br>
<br>
<br>

## Reason
<br>
It can be used to manage and control intervals anywhere in your code, in this simple way you can start and stop the intervals, whitout side effects or memory leaks.

<br>

## Install

```
$ npm install interval-handler
```

## Usage
<br>

> First it is created a interval handler, after it print 'foo' two times and finally stop the interval.

```js
    const ih = require('interval-handler')
    const ih = intervalHandler(1000, () => console.log('foo'))
    ih.start()

    setTimeout(ih.stop, 3000)
```
## API

### Function contructor of interval handler

```ts
function createIntervalHandler(): IntervalHandler // This returns the next methods and properties
```

### Start the interval
```ts

/**
 * @param {boolean} [fn=false] if 'already' param is true, call right away the interval function on start.
 */
function start(already?: boolean) => any): void
```

### Stop the interval
```ts
function stop(): void
```

### Show if stopped the interval
```ts
function isStopped(): void
```