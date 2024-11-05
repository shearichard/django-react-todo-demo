#!/bin/bash
# Check if there's already an instance of swaggerapi/swagger-ui running
if docker ps --filter "ancestor=swaggerapi/swagger-ui" --format '{{.ID}}' | grep -q .; then
  echo "Warning: An instance of 'swaggerapi/swagger-ui' is already running."
else
  # Check if port 80 is already in use
  if lsof -i :80 | grep -q LISTEN; then
    echo "Warning: Port 80 is already in use."
  else
    # Run the Docker command
    docker run -p 80:8080 -e SWAGGER_JSON=/schema.yml -v "${PWD}/schema.yml:/schema.yml" swaggerapi/swagger-ui
  fi
fi

