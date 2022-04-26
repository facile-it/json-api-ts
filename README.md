# JSON:API Codec

A very opinionated library for enconding [JSON:API](https://jsonapi.org/) requests and decoding JSON:API responses. It resolves `relationships` into nested documents, allowing an easy switch from `application/json` to `application/vnd.api+json`.

## Documentation

The public API consists of two functions, `encode` and `decode`.

### `encode: (u: unknown) => Document`

Transforms any kind of JSON data into a JSON:API document.

### `decode: (u: unknown) => unknown`

Tries decoding a JSON:API document into a JSON payload.
