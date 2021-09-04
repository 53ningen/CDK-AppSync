import { GraphQLClient } from 'graphql-request';
import React, { useEffect, useState } from 'react';
import './App.css';
import { getSdk } from './generated/graphql';
import Outputs from './outputs.json';

const apiUrl = Outputs.HelloAppSyncStack.ApiUrl
const apiKey = Outputs.HelloAppSyncStack.ApiKey
const cli = new GraphQLClient(apiUrl, {
  headers: {
    "x-api-key": apiKey
  }
})
const sdk = getSdk(cli)

export const Hello = () => {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchMessage = async () => {
      const result = await sdk.sayHelloLambda({ yourName: name })
      setMessage(result.sayHelloLambda)
    }
    const timer = setTimeout(() => {
      console.log(name)
      if (name === '') {
        setMessage('INPUT YOUR NAME')
      } else {
        fetchMessage()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [name])
  return (
    <p>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <p>{message}</p>
    </p>
  )
}

