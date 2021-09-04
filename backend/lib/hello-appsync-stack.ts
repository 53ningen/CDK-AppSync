import { AuthorizationType, GraphqlApi, MappingTemplate, Schema } from '@aws-cdk/aws-appsync';
import { NodejsFunction, SourceMapMode } from '@aws-cdk/aws-lambda-nodejs';
import * as cdk from '@aws-cdk/core';
import { CfnOutput, Duration } from '@aws-cdk/core';

export class HelloAppSyncStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new GraphqlApi(this, 'HelloAppSyncApi', {
      name: 'HelloAppSync',
      schema: Schema.fromAsset('src/graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
        },
      },
    })

    const sayHelloDataSoruce = api.addNoneDataSource('SayHelloDataSoruce', {})
    const sayHelloResolver = sayHelloDataSoruce.createResolver({
      typeName: 'Query',
      fieldName: 'sayHello',
      requestMappingTemplate: MappingTemplate.fromString(JSON.stringify({
        "version": "2018-05-29",
        "payload": ""
      })),
      responseMappingTemplate: MappingTemplate.fromString('"Hello, World!"')
    })

    const sayHelloLambdaFunction = new NodejsFunction(this, 'SayHelloLambdaFunction', {
      entry: 'src/lambda/hello.ts',
      timeout: Duration.seconds(3),
      memorySize: 128,
      bundling: {
        sourceMap: true,
        sourceMapMode: SourceMapMode.DEFAULT,
      }
    })
    const sayHelloLambdaDataSoruce = api.addLambdaDataSource('SayHelloLambdaDataSource', sayHelloLambdaFunction)
    const sayHelloLambdaResolver = sayHelloLambdaDataSoruce.createResolver({
      typeName: 'Query',
      fieldName: 'sayHelloLambda',
    })

    new CfnOutput(this, 'ApiUrl', { value: api.graphqlUrl })
    new CfnOutput(this, 'ApiKey', { value: api.apiKey || '' })
  }
}
