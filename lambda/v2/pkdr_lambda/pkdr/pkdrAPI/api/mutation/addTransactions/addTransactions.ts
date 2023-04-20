import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const region = "us-west-2";
const client = new DynamoDBClient({ region });
import { TRANSACTIONS_DB } from "../../../../../../constants";
import { TransactionParams } from "../../types/argsTypes";
import getUserInfo from "../../../../../../users_lambda/query/users/getUserInfo/getUserInfo";
import { UserInfoParams } from "../../../../../../users_lambda/data_types/types/t_arguments/t_user";
import { UserInfoResult } from "../../../../../../users_lambda/data_types/types/t_return/t_user";

const fetchUserNameInfo = async (id: string): Promise<UserInfoResult> => {
  const getUserInfoParams: UserInfoParams = {
    id: id,
    attributeInfo: "USERNAME",
  };
  return await getUserInfo(getUserInfoParams);
};

const addToTransactionsTable = async (transactionParams: TransactionParams) => {
  const input = {
    TableName: TRANSACTIONS_DB,
    Item: marshall({
      id: transactionParams.hash,
      From: transactionParams.from,
      To: transactionParams.to,
      Amount: transactionParams.amount,
      TimeStamp: Date.now(),
      Type: transactionParams.txType,
      Logs: null,
      Status: transactionParams.status
    }),
  };
  const getUserInfoParams: UserInfoParams = {
    id: "",
    attributeInfo: "USERNAME",
  };
  try {
    switch (transactionParams.txType) {
      case "mint":
        const fromUserInfo = transactionParams.from;
        getUserInfoParams.id = transactionParams.to!;
        const toUserInfo: UserInfoResult = await getUserInfo(getUserInfoParams);
        if (toUserInfo.success) {
          input.Item.From = fromUserInfo;
          input.Item.To = toUserInfo.value;

          const command = new PutItemCommand(input);
          await client.send(command);
        }
        break;
      case "transferFrom":
        const fromRes: UserInfoResult = await fetchUserNameInfo(
          transactionParams.from!
        );
        const toRes: UserInfoResult = await fetchUserNameInfo(
          transactionParams.to!
        );
        if (fromRes.success && fromRes.value) {
          input.Item.From = fromRes.value;
        }
        if (toRes.success && toRes.value) {
          input.Item.To = toRes.value;
        }
        const command = new PutItemCommand(input);
        await client.send(command);
        break;
    }
  } catch (error) {
    console.log(error?.toString());
  }
};

export default addToTransactionsTable;
