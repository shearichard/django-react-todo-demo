#!/bin/bash
docker run -p 5000:8080 --name swaggerui \
	-v ./openapi.yaml:/openapi/openapi.yaml \
        -e SWAGGER_JSON=/openapi/openapi.yaml \
        swaggerapi/swagger-ui
