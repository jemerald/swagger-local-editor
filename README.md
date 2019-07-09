# swagger-local-editor

This project demonstrates using express server to host swagger editor to view
and edit OpenAPI specifications (that is also hosted by the same express
server).

The specifications is served at `/specs/*`, which maps to local `./specs`
folder and provides `GET` and `PUT` methods for retrieving and updating the
local files.

The editor is served at `/editor/` with most of the assets from the
`swagger-editor-dist` package. The only customisation is the `index.html` page,
which is based on the [default](https://github.com/swagger-api/swagger-editor/blob/master/index.html)
with a custom plugin that issues `PUT` request to the URL whenever the spec
is changed.

The setup supports referencing definitions across files by relative path.

## Usage

```sh
npm install
npm start
```

The follow the prompt and open browser to `http://localhost:8080/editor/?url=/specs/myapi.yaml`
