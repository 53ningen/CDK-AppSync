#!/bin/sh

API_URL=$(cat ../outputs.json | jq -r '.HelloAppSyncStack.ApiUrl')
API_KEY=$(cat ../outputs.json | jq -r '.HelloAppSyncStack.ApiKey')


curl -s -H "x-api-key: $API_KEY" \
    -d '{ "query": "query MyQuery { sayHello }" }' $API_URL | jq

curl -s -H "x-api-key: $API_KEY" \
    -d '{ "query": "query MyQuery { sayHelloLambda(yourName: \"Ken\") }" }' $API_URL | jq