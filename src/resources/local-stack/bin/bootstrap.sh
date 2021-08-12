#!/usr/bin/env sh

set -e

SLS_DEPLOYMENT_BUCKET_SSM_NAME="s3-serverless-deployment"
S3_BUCKET_NAME="local-marley-sls-deployments"
ENDPOINT_URL="http://${LOCALSTACK_HOSTNAME}:4566"

echo "Attempting to create deployment bucket..."
aws s3 mb s3://${S3_BUCKET_NAME} \
--endpoint-url $ENDPOINT_URL
echo "Done"

echo "Attempting to create SSM parameters..."
aws ssm put-parameter \
--name "${SLS_DEPLOYMENT_BUCKET_SSM_NAME}" \
--type "String" \
--value "$S3_BUCKET_NAME" \
--endpoint-url $ENDPOINT_URL \
--overwrite
echo "Done"

