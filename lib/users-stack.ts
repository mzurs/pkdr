import * as cdk from "aws-cdk-lib";
import { Stack, StackProps, aws_iam as iam, RemovalPolicy } from "aws-cdk-lib";
import * as appsync from "aws-cdk-lib/aws-appsync";
import {
  AccountRecovery,
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { readFileSync } from "fs";
import { resolve, join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  AttributeType,
  Table,
  BillingMode,
  TableEncryption,
  CfnGlobalTable,
  ProjectionType,
} from "aws-cdk-lib/aws-dynamodb";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { CfnGraphQLApi } from "aws-cdk-lib/aws-appsync";
import { Runtime } from "aws-cdk-lib/aws-lambda";

const DYNAMODB_DATABASE_NAME: string = "PKDR_FINANCE";
const TRANSACTIONS_DATABASE_NAME: string = "TRANSACTIONS";
const CHECKOUT_DATABASE_NAME: string = "CHECKOUT";
export class UsersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Database DynamoDB
    //---------------------TRANSACTIONS TABLE--------------------
    const transactionsDatabaseDynamoDB: Table = new Table(
      this,
      "transactionsDatabaseDynamoDB",
      {
        tableName: TRANSACTIONS_DATABASE_NAME,
        partitionKey: {
          name: "id",
          type: AttributeType.STRING,
        },
        // sortKey: {
        //   name: "cnic",
        //   type: AttributeType.STRING,
        // },
        billingMode: BillingMode.PROVISIONED,
        encryption: TableEncryption.AWS_MANAGED,
        removalPolicy: RemovalPolicy.DESTROY, //will delete table after deletting cloudfomration
      }
    );

    //---------------------------------------CHECKOUT TABLE----------------------------------------------------------------
    const checkoutDatabaseDynamoDB: Table = new Table(
      this,
      "checkoutDatabaseDynamoDB",
      {
        tableName: CHECKOUT_DATABASE_NAME,
        partitionKey: {
          name: "id",
          type: AttributeType.STRING,
        },
        // sortKey: {
        //   name: "cnic",
        //   type: AttributeType.STRING,
        // },
        billingMode: BillingMode.PROVISIONED,
        encryption: TableEncryption.AWS_MANAGED,
        removalPolicy: RemovalPolicy.DESTROY, //will delete table after deletting cloudfomration
      }
    );

    //------------------USERS TABLE ----------------

    const usersDatabaseDynamoDB: Table = new Table(
      this,
      "usersDatabaseDynamoDB",
      {
        tableName: DYNAMODB_DATABASE_NAME,
        partitionKey: {
          name: "id",
          type: AttributeType.STRING,
        },
        // sortKey: {
        //   name: "cnic",
        //   type: AttributeType.STRING,
        // },
        billingMode: BillingMode.PROVISIONED,
        encryption: TableEncryption.AWS_MANAGED,
        removalPolicy: RemovalPolicy.DESTROY, //will delete table after deletting cloudfomration
      }
    );
    // cnic global secondary Index "cnicIndex" GSI
    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "cnicIndex",
      partitionKey: {
        name: "cnic",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    });

    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "userNameIndex",
      partitionKey: {
        name: "USERNAME",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    });

    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "getAddressByUserNameIndex",
      partitionKey: {
        name: "USERNAME",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.INCLUDE, //copied all data from table to GSI
      nonKeyAttributes: ["ETH_ADDRESS"],
    });
    // // usersDatabaseDynamoDB.addGlobalSecondaryIndex({
    // //   indexName: "phoneNumberIndex",
    // //   partitionKey: {
    // //     name: "PHONENUMBER",
    // //     type: AttributeType.STRING,
    // //   },
    // //   // sortKey: {
    // //   //   name: "sk",
    // //   //   type: AttributeType.STRING,
    // //   // },
    // //   // readCapacity: 1,
    // //   // writeCapacity: 1,
    // //   projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    // // });

    //authLambda
    const authLambda = new NodejsFunction(this, "authLambda", {
      entry: join(
        __dirname,
        "..",
        "lambda",
        "v2",
        "auth_lambda",
        "src",
        "index.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
    });
    //AppSync GraphQL API --additional Authentication Provider
    // const additionalAuthenticationProviderProperty: appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty =
    //   {
    //     authenticationType: "AWS_LAMBDA",
    //     lambdaAuthorizerConfig: {
    //       authorizerResultTtlInSeconds: 120,
    //       authorizerUri: authLambda.functionArn,
    //       // identityValidationExpression: 'identityValidationExpression',
    //     },
    //     userPoolConfig: {
    //       appIdClientRegex: "3tihr2r882rhmgvfmkdh56vdqe", //app client ID
    //       awsRegion: "us-west-2",
    //       userPoolId: "us-west-2_cPjOesJgg",
    //     },
    //   };

    //AppSync GraphQL API
    const pkdrFinanceUsersApi = new CfnGraphQLApi(this, "pkdrFinanceUsersApi", {
      name: "pkdrFinanceUsersApi",
      authenticationType: "AWS_LAMBDA",
      lambdaAuthorizerConfig: {
        authorizerResultTtlInSeconds: 0,
        authorizerUri: authLambda.functionArn,
        // identityValidationExpression: 'identityValidationExpression',
      },
    });

    //definition of graphql schema
    const definition = readFileSync(
      resolve(__dirname, "../graphql/schema.graphql")
    ).toString();
    console.log("**************", definition);

    //graphql schema appsync
    const pkdrFinanceUsersApiSchema = new appsync.CfnGraphQLSchema(
      this,
      `pkdrFinanceUsersApiSchema`,
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        definition,
      }
    );

    //Lambda Function Declaration
    //ZK Lambda

    const zkLambda = NodejsFunction.fromFunctionArn(
      this,
      "zkLambda",
      "arn:aws:lambda:us-west-2:662538652517:function:test"
    );

    //users Lambda
    const usersLambda = new NodejsFunction(this, "usersLambda", {
      entry: join(
        __dirname,
        "..",
        "lambda",
        "v2",
        "users_lambda",
        "src",
        "index.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(60),
    });

    //PKDR LAmbda
    const pkdrLambda = new NodejsFunction(this, "pkdrLambda", {
      entry: join(
        __dirname,
        "..",
        "lambda",
        "v2",
        "pkdr_lambda",
        "src",
        "index.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(60),
      memorySize: 1024,
      ephemeralStorageSize: cdk.Size.mebibytes(1024),
    });

    const userApiServiceRole: iam.Role = new iam.Role(
      this,
      "userApiServiceRole",
      {
        assumedBy: new iam.ServicePrincipal("appsync.amazonaws.com"),
      }
    );
    userApiServiceRole.addToPolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: ["lambda:InvokeFunction"],
      })
    );
    const pkdrLambdaDataSource = new appsync.CfnDataSource(
      this,
      "pkdrLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "pkdrLambdaDataSource",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: pkdrLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );
    const zkLambdaDataSource = new appsync.CfnDataSource(
      this,
      "zkLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "zkLambdaDataSource",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: zkLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );
    const usersLambdaDataSource = new appsync.CfnDataSource(
      this,
      "usersLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "usersApiResolverDataSourceName",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: usersLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );

    const adminLambdaDataSource = new appsync.CfnDataSource(
      this,
      "adminLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "adminApiResolverDataSourceName",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: usersLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );

    //-------------------------------------TOPUP Resolvers----------------------------------------------

    //-------------------------------- Mutations--------------------------------
    const resolver_topUpAddress: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_topUpAddress",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "topUpAddress",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    //----------------------------------- Query--------------------------------

    //getRateUSDPKR
    const resolver_getRateUSDPKR: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getRateUSDPKR",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getRateUSDPKR",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    // ----------------------------------PKDR resolvers------------------------------------------------

    // ------------------------Mutations ------------------------
    const resolver_setProfileAddress: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_setProfileAddress", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "setProfileAddress",
        dataSourceName: pkdrLambdaDataSource.name,
      });

    const resolver_mintPKDR: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_mintPKDR",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "mintPKDR",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );
    const resolver_transfer: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_transfer",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "transfer",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    const resolver_transferFrom: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_transferFrom",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "transferFrom",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    const resolver_approve: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_approve",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "approve",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    //setPlatFormFee
    const resolver_setPlatFormFee: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_setPlatFormFee", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "setPlatFormFee",
        dataSourceName: pkdrLambdaDataSource.name,
      });

    const resolver_burn: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_burn",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "burn",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    const resolver_burnFrom: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_burnFrom",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "burnFrom",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );
    //withdraw
    const resolver_withdraw: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_withdraw",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "withdraw",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    const resolver_revokeVerification: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_revokeVerification", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "revokeVerification",
        dataSourceName: pkdrLambdaDataSource.name,
      });

    const resolver_retainVerification: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_retainVerification", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "retainVerification",
        dataSourceName: pkdrLambdaDataSource.name,
      });
    // ------------------------Query ------------------------

    const resolver_getProfileAddress: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getProfileAddress", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getProfileAddress",
        dataSourceName: pkdrLambdaDataSource.name,
      });

    const resolver_getPlatFormFees: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getPlatFormFees", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getPlatFormFee",
        dataSourceName: pkdrLambdaDataSource.name,
      });

    const resolver_getETHBalance: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getETHBalance",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getETHBalance",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    const resolver_totalSupply: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_totalSupply",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "totalSupply",
        dataSourceName: pkdrLambdaDataSource.name,
      }
    );

    //------------------------------Profile resolvers------------------------------------------------

    //--------------------------------Mutation ------------------------------------------------
    const resolver_zeroKnowledgeProfile: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_zeroKnowledgeProfile", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "zeroKnowledgeProfile",
        dataSourceName: zkLambdaDataSource.name,
      });

    const resolver_createUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_createUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "createUser",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_create_ETH_Profile: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_create_ETH_Profile", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "create_ETH_Profile",
        dataSourceName: usersLambdaDataSource.name,
      });
    const resolver_zkProfile: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_zkProfile",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "zkProfile",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    //getUserInfo
    const resolver_getUserInfo: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getUserInfo",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getUserInfo",
        dataSourceName: usersLambdaDataSource.name,
      }
    );
    //listContacts
    const resolver_listContacts: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_listContacts",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "listContacts",
        dataSourceName: usersLambdaDataSource.name,
      }
    );
    const resolver_getUserById: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getUserById",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getUserByEmail",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_updateUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_updateUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "updateUser",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_setUserName: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_setUserName",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "setUserName",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_addContacts: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_addContacts",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "addContacts",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_getAddressByUserName: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getAddressByUserName", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getAddressByUserName",
        dataSourceName: usersLambdaDataSource.name,
      });

    //--------------------------------Query ------------------------------------------------

    //get Users Count from ETH Contract
    const resolver_getUsersCount: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getUsersCount",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getUsersCount",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    //resolver_revokeVerification
    resolver_revokeVerification.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_revokeVerification.node.addDependency(pkdrLambdaDataSource);

    //resolver_RetainVerificationResult
    resolver_retainVerification.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_retainVerification.node.addDependency(pkdrLambdaDataSource);

    //resolver_withdraw
    resolver_withdraw.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_withdraw.node.addDependency(pkdrLambdaDataSource);

    //resolver_totalSupply
    resolver_totalSupply.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_totalSupply.node.addDependency(pkdrLambdaDataSource);

    //resolver_topUpAddress
    resolver_topUpAddress.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_topUpAddress.node.addDependency(pkdrLambdaDataSource);

    //resolver_getRateUSDPKR
    resolver_getRateUSDPKR.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getRateUSDPKR.node.addDependency(pkdrLambdaDataSource);

    resolver_getUsersCount.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getUsersCount.node.addDependency(usersLambdaDataSource);

    //PKDR resolvers;
    resolver_getPlatFormFees.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getPlatFormFees.node.addDependency(pkdrLambdaDataSource);

    //resolver_transfer
    resolver_transfer.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_transfer.node.addDependency(pkdrLambdaDataSource);

    //resolver_transferFrom
    resolver_transferFrom.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_transferFrom.node.addDependency(pkdrLambdaDataSource);

    //resolver_burn
    resolver_burn.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_burn.node.addDependency(pkdrLambdaDataSource);

    //resolver_burnFrom
    resolver_burnFrom.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_burnFrom.node.addDependency(pkdrLambdaDataSource);

    //resolver_getETHBalance
    resolver_getETHBalance.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getETHBalance.node.addDependency(pkdrLambdaDataSource);

    resolver_getAddressByUserName.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getAddressByUserName.node.addDependency(usersLambdaDataSource);

    resolver_addContacts.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_addContacts.node.addDependency(usersLambdaDataSource);

    resolver_setUserName.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_setUserName.node.addDependency(usersLambdaDataSource);

    resolver_zkProfile.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_zkProfile.node.addDependency(usersLambdaDataSource);

    resolver_updateUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_updateUser.node.addDependency(usersLambdaDataSource);

    resolver_createUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_createUser.node.addDependency(usersLambdaDataSource);

    resolver_create_ETH_Profile.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_create_ETH_Profile.node.addDependency(usersLambdaDataSource);

    resolver_getUserById.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getUserById.node.addDependency(usersLambdaDataSource);
    //resolver_listContacts
    resolver_listContacts.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_listContacts.node.addDependency(usersLambdaDataSource);
    //resolver_getUserInfo
    resolver_getUserInfo.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getUserInfo.node.addDependency(usersLambdaDataSource);

    resolver_zeroKnowledgeProfile.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_zeroKnowledgeProfile.node.addDependency(zkLambdaDataSource);

    resolver_setProfileAddress.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_setProfileAddress.node.addDependency(pkdrLambdaDataSource);

    resolver_mintPKDR.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_mintPKDR.node.addDependency(pkdrLambdaDataSource);

    resolver_getProfileAddress.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getProfileAddress.node.addDependency(pkdrLambdaDataSource);

    resolver_approve.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_approve.node.addDependency(pkdrLambdaDataSource);
    //resolver_setPlatFormFee
    resolver_setPlatFormFee.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_setPlatFormFee.node.addDependency(pkdrLambdaDataSource);

    const resolver_deleteUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_deleteUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "deleteUser",
        dataSourceName: adminLambdaDataSource.name,
      }
    );
    resolver_deleteUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_deleteUser.node.addDependency(adminLambdaDataSource);

    const resolver_getAllUserInfo: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getAllUserInfo", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getAllUserInfo",
        dataSourceName: adminLambdaDataSource.name,
      });
    resolver_getAllUserInfo.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getAllUserInfo.node.addDependency(adminLambdaDataSource);

    usersDatabaseDynamoDB.grantReadWriteData(usersLambda);
    usersDatabaseDynamoDB.grantReadWriteData(pkdrLambda);

    transactionsDatabaseDynamoDB.grantReadWriteData(usersLambda);
    transactionsDatabaseDynamoDB.grantReadWriteData(pkdrLambda);

    checkoutDatabaseDynamoDB.grantReadWriteData(usersLambda);
    checkoutDatabaseDynamoDB.grantReadWriteData(pkdrLambda);

    usersLambda.addEnvironment(
      "PKDR_FINANCE_USER_TABLE",
      usersDatabaseDynamoDB.tableName
    );
    pkdrLambda.addEnvironment(
      "TRANSACTIONS_TABLE",
      transactionsDatabaseDynamoDB.tableName
    );
  }
}
