# django-allauth
Allauth has provision for exposing functionality via a set of API endpoints, [that is documented here](https://docs.allauth.org/en/latest/headless/index.html).

## OpenAPI Specification
The YAML file in this directory documents the endpoints exposed by allauth. The file, openapi.yaml, was downloaded from https://allauth.org/docs/draft-api/ on 2024-12-04.

It may be viewed by visiting https://editor.swagger.io/ (File > Import File) or by executing the following

```
docker compose up
```

After which the Swagger output will be visible at http://localhost:5000 .

