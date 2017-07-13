
# waitCalls: executed after n successful calls

```javascript
module.exports = {
    service: …,
    trigger: …,
    actions: […],
    config: {
        scheduler: {
            waitCalls: 5 // the actions are called only once for every 5 successful events
        }
        …
    },
}
```


# debounce: executed maximum once per n mseconds, first call after n mseconds

```javascript
module.exports = {
    service: …,
    trigger: …,
    actions: […],
    config: {
        scheduler: {
            debounce: 1000 // Actions will be called at most once per second. First call after 1second
        }
        …
    },
}
```

# throttle: executed once asap and then debounce other calls

```javascript
module.exports = {
    service: …,
    trigger: …,
    actions: […],
    config: {
        scheduler: {
            throttle: 1000 // Actions will be called the first time and then at most once per second for subsequent calls.
        }
        …
    },
}
```

# buffer: buffer queries until you decide it's time to execute actions

```javascript
module.exports = {
    service: …,
    trigger: …,
    actions: […],
    config: {
        scheduler: {
            buffer: {
                // context.buffer holds all the queries
                // @required
                until: ({ingredients, context}) =>
                    // we run the buffer until the sum of all the length of all messages is above 100 characters
                    context.buffer.reduce(
                        (count, query) => count + query.text.length
                    , 0) > 100
                // called before context.buffer.push to update the value of the added query
                // if you return an empty value, nothing is added
                , map: (item, {context}) => item
                // it exists. should you use it? prob. not
                , shouldRunActions({ingredients, context}) => boolean
            }
        }
        …
    },
}
```