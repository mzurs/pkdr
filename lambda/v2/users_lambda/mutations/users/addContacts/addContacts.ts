const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
import { TABLENAME } from "../../../../constants";
import { ICHECKBYEMAIL } from "../../../data_types/interfaces/i_user";
import {
  UpdateContactList,
  UpdateUser,
} from "../../../data_types/types/t_arguments/t_user";
import { Error } from "../../../data_types/types/t_return/t_e_user";
import {
  UpdatedResult,
  UserNotExists,
} from "../../../data_types/types/t_return/t_user";

async function addContacts(
  user: UpdateContactList
): Promise<UpdatedResult | UserNotExists | Error> {
  if (user.id != "" || typeof user.id != null || typeof user == "undefined") {
    const emailParams: ICHECKBYEMAIL = {
      TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
      Key: {
        id: user.id,
      },
    };
    const paramsUserName = {
      TableName: TABLENAME,
      IndexName: "userNameIndex",
      KeyConditionExpression: "#USERNAME = :USERNAME",
      ExpressionAttributeNames: { "#USERNAME": "USERNAME" },
      ExpressionAttributeValues: { ":USERNAME": user.attributeValue },
    };

    try {
      const { Items } = await docClient.query(paramsUserName).promise();
      if (typeof Items[0].USERNAME == "string") {
        // return false;
        if (user.id) {
          try {
            const { Item } = await docClient.get(emailParams).promise();
            if (typeof Item == "undefined") {
              const userNotExists: UserNotExists = {
                __typename: "UserNotExists",
                message: `User with id: ${user.id} not exists`,
              };
              return userNotExists;
            } else if (
              typeof Item.id == "string" ||
              typeof Item != "undefined"
            ) {
              var params = {
                TableName: TABLENAME, //process.env.PKDR_FINANCE_USER_TABLE,
                Key: { id: user.id },
                UpdateExpression:
                  "SET #CONTACTS_ADDED = list_append(if_not_exists(#CONTACTS_ADDED, :empty_list), :new_value)", //:attributeValue), :attributeValue)",
                ExpressionAttributeNames: {
                  "#CONTACTS_ADDED": "CONTACTS_ADDED",
                },
                ExpressionAttributeValues: {
                  ":empty_list": [],
                  ":new_value": [user.attributeValue],
                },

                ReturnValues: "ALL_NEW",
              };

              await docClient.update(params).promise();
              const updatedItemResult: UpdatedResult = {
                __typename: "UpdatedResult",
                id: user.id,
                message: "User Contacts List updated",
              };
              return updatedItemResult;
            } else {
              const idError: Error = {
                __typename: "Error",
                errorMessage: `User with ${user.id} not found`,
              };
              return idError;
            }
          } catch (error) {
            console.log("****", error);
            const ERROR: Error = {
              __typename: "Error",
              errorMessage: error as string,
            };
            return ERROR;
          }
        } else {
          const argsError: Error = {
            __typename: "Error",
            errorMessage: "Arguments are invalid",
          };
          return argsError;
        }
      }
      // return true;
    } catch (error) {
      const userNotExists: UserNotExists = {
        __typename: "UserNotExists",
        message: `USERNAME Not Exists: User with name: ${user.attributeValue} not exists`,
      };
      return userNotExists;
    }

    const ERROR: Error = {
      __typename: "Error",
      errorMessage: "Error while adding user",
    };
    return ERROR;
  } else {
    const argsError: Error = {
      __typename: "Error",
      errorMessage: "Arguments are invalid",
    };
    return argsError;
  }
}

export default addContacts;
