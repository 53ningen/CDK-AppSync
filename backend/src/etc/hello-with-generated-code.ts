import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../generated/graphql'
import Output = require('../../../outputs.json')

const apiUrl = Output.HelloAppSyncStack.ApiUrl
const apiKey = Output.HelloAppSyncStack.ApiKey

const cli = new GraphQLClient(apiUrl, {
  headers: {
    "x-api-key": apiKey
  }
})
const sdk = getSdk(cli)

const main = async () => {
  const res = await sdk.sayHelloLambda({ yourName: 'Ken' })
  console.log(res.sayHelloLambda)
}

main().then(_ => { })
