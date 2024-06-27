# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm install
```

### Environment Variables

| Name                         | Description                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| TYPESENSE_COLLECTION_NAME    | The [collection name](https://typesense.org/docs/guide/docsearch.html#create-a-docsearch-scraper-config-file).                 |
| TYPESENSE_SERVER_HOST        | The host of the typesense server.                                                                                              |
| TYPESENSE_SEARCH_ONLY_APIKEY | The [search-only api key](https://typesense.org/docs/26.0/api/api-keys.html#search-only-api-key) for searching the collection. |

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.
