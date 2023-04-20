const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

import { TABLENAME } from "../../../../constants";
import { GetInfoByAddressResult } from "../../../data_types/types/t_arguments/t_user";
import getAddressByUserName from "../getAddressByUserName/getAddressByUserName";


const getInfoByAddress = async (
  ETH_ADDRESS: string
): Promise<GetInfoByAddressResult> => {
  const res: GetInfoByAddressResult = {
    success: false,
    userName: null,
    id: null,
    errorMessage: null,
  };

  const params = {
    TableName: TABLENAME,
    IndexName: "ETH_ADDRESS_index",
    KeyConditionExpression: "#ETH_ADDRESS = :ETH_ADDRESS",
    ExpressionAttributeNames: { "#ETH_ADDRESS": "ETH_ADDRESS" },
    ExpressionAttributeValues: { ":ETH_ADDRESS": ETH_ADDRESS },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].ETH_ADDRESS == "string") {
      res.userName = Items[0].USERNAME;
      res.id = Items[0].id;
      res.success = true;
      return res;
    } else {
      res.errorMessage = "Didn't findETH address";
      return res;
    }
  } catch (error) {
    res.errorMessage = JSON.stringify((error as unknown as any).message);
    return res;
  }
};


export default getInfoByAddress