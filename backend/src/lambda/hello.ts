import 'source-map-support/register'

type HelloInput = {
  arguments: {
    yourName: string,
  }
}

type HelloOutput = String

export async function handler(input: HelloInput, _: object): Promise<HelloOutput> {
  console.log(`input: ${JSON.stringify(input)}`)
  return `Hello, ${input.arguments.yourName}!`
}
