//getUserInfo

import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { TABLENAME } from "../../../../constants";
import {
  UserInfo,
  UserInfoResult,
} from "../../../data_types/types/t_return/t_user";
import { UserInfoParams } from "../../../data_types/types/t_arguments/t_user";
import { userInfo } from "os";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

async function getUserInfo(
  userInfoParams: UserInfoParams
): Promise<UserInfoResult> {
  const res: UserInfoResult = {
    success: false,
    message: "",
    value: "",
    errorMessage: "",
  };
  const input = {
    Key: marshall({
      id: userInfoParams.id,
    }),
    TableName: TABLENAME,
  };
  try {
    const command = new GetItemCommand(input);

    const { Item } = await client.send(command);

    const item = unmarshall(Item);

    

    if (typeof item[userInfoParams.attributeInfo] == "string") {
      res.success = true;
      res.message = "Successfully retrieved";
      res.value = item[userInfoParams.attributeInfo];
      return res;
    } else {
      // res.value=JSON.stringify(item);
      res.success = false;
      res.message = "Not found";
      return res;
    }
  } catch (error) {
    res.success = false;
    res.errorMessage = JSON.stringify(error as unknown as any, null, 2);
  }
  return res;
}

export default getUserInfo;
