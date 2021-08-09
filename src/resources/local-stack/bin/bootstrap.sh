#!/usr/bin/env sh

set -e

echo "Attempting to create deployment bucket..."
aws s3 mb s3://local-marley-sls-deployments --endpoint-url http://${LOCALSTACK_HOSTNAME}:4566
echo "Done"
