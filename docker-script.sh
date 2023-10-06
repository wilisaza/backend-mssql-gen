#!/bin/sh

#Stop running container
docker stop $(docker ps -a -q  --filter ancestor=service/backend_mssql_gen)

# Build container
docker build -t service/backend_mssql_gen .

# Run container
docker run -p 5050:5050 -d service/backend_mssql_gen
