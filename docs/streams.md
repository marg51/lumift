# streams

```javascript
module.exports = {
    id: …,
    type: …,
    service: …,
    name: …,
    extract_ingredients: event => event,
    stream_config: {
        // onEvent is a callback, should be called everytime and event is received from the stream with {type, payload}
        start: (config, onEvent) => rtm(config, onEvent),
        _filters: ({ body, config }) => match(body, config),
    },
}
```