import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
const AWS = require("aws-sdk");
const docClinet = new AWS.DynamoDB.DocumentClient();

import { ListContactsParams } from "../../../data_types/types/t_arguments/t_user";
import {
  ListContactsResult,
  UserExists,
  UserInfo,
  UserNotExists,
} from "../../../data_types/types/t_return/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
// import getUserByEmail from "../getUserByEmail/getUserByEmail";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
import { TABLENAME } from "../../../../constants";

async function getUserByEmail(id: string): Promise<boolean> {
  const params = {
    TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
    Key: {
      id: id,
    },
  };

  try {
    const { Item } = await docClinet.get(params).promise();
    if (typeof Item == "undefined") {
      const userNotExists: UserNotExists = {
        __typename: "UserNotExists",
        message: `User with id: ${id} not exists`,
      };
      return false;
    } else {
      const userInfo: UserInfo = {
        __typename: "UserInfo",
        userInfo: `${Item.id}`,
      };
      return true;
    }
  } catch (err) {
    console.log("****", err);
    const ERROR: Error = {
      __typename: "Error",
      errorMessage: err as string,
    };
    return false;
  }
  const ERROR: Error = {
    __typename: "Error",
    errorMessage: "Error while fetching through Email",
  };
  return false;
}

async function listContacts(
  listContactsParams: ListContactsParams
): Promise<ListContactsResult | UserNotExists | Error> {
  const region = "us-west-2";

  const client = new DynamoDBClient({ region });

  const error: Error = {
    __typename: "Error",
    errorMessage: "",
  };
  const res: ListContactsResult = {
    __typename: "ListContactsResult",
    contacts: [],
  };
  if (await getUserByEmail(listContactsParams.id)) {
    try {
      const input = {
        Key: marshall({
          id: listContactsParams.id,
        }),
        TableName: TABLENAME,
      };
      const command = new GetItemCommand(input);
      const { Item } = await client.send(command);
      const contacts: string[] = unmarshall(Item).CONTACTS_ADDED;
      if (!contacts) {
        return res;
      } else {
        res.contacts = contacts.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        return res;
      }
    } catch (err) {
      error.errorMessage = JSON.stringify((err as unknown as any).message);
      return error;
    }
    return error;
  } else {
    const userNotExists: UserNotExists = {
      __typename: "UserNotExists",
      message: `User with id: ${listContactsParams.id} not exists`,
    };
    return userNotExists;
  }
}

export default listContacts;
