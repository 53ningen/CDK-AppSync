import fetch from 'node-fetch'
import Outputs = require('../../../outputs.json')

const apiUrl = Outputs.HelloAppSyncStack.ApiUrl
const apiKey = Outputs.HelloAppSyncStack.ApiKey
const query = `
{
  sayHelloLambda(yourName: "Ken")
}
`

const main = async () => {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey
    },
    body: JSON.stringify({ query })
  })
  const data = await res.json()
  console.log(JSON.stringify(data))
}

main().then(_ => { })
