import {
  DynamoDBClient,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
import { v4 as uuidv4 } from "uuid";
import { BurnFromParams, WithdrawParams } from "../../types/argsTypes";
import {
  BurnFromResult,
  BurnResult,
  WithdrawParam,
  WithdrawParamsResult,
} from "../../types/returnTypes";
import { TABLENAME } from "../../../../../../constants";
import burnFrom from "../burnFrom/burnFrom";
const request = require("request");

const region = "us-west-2";
const client = new DynamoDBClient({ region });

function fundTransfer(transferID: string): Promise<any> {
  const URL = `https://api.sandbox.transferwise.tech/v3/profiles/16565240/transfers/${transferID}/payments`;

  // console.log("🚀 ~ file: withdraw.ts:11 ~ fundTransfer ~ URL:", URL);
  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "POST",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "BALANCE",
      }),
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function createTransfer(recipientID: string, quoteId: string): Promise<any> {
  const URL = "https://api.sandbox.transferwise.tech/v1/transfers";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "POST",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetAccount: recipientID,
        quote: quoteId,
        customerTransactionId: uuidv4(),
        details: {
          reference: "to my friend",
          transferPurpose: "verification.transfers.purpose.pay.bills",
          sourceOfFunds: "verification.source.of.funds.other",
        },
      }),
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

function createRecipient(
  IBAN: string,
  accountHolderName: string
): Promise<any> {
  const URL = "https://api.sandbox.transferwise.tech/v1/accounts";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "POST",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: 16565240,
        accountHolderName: accountHolderName,
        currency: "PKR",
        type: "iban",
        details: {
          legalType: "PRIVATE",
          IBAN: IBAN,
        },
      }),
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
function getQuote(amount: number): Promise<any> {
  const URL = "https://api.sandbox.transferwise.tech/v1/quotes";

  return new Promise((resolve, reject) => {
    const options = {
      url: URL,
      method: "POST",
      headers: {
        Authorization: "Bearer 613161da-3f90-48a1-b179-d7aefaf70cf1",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profile: 16565240,
        source: "PKR",
        target: "PKR",
        rateType: "FIXED",
        sourceAmount: amount,
        type: "BALANCE_PAYOUT",
      }),
    };
    request(options, (error: any, response: unknown, body: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}
const verifyUserDetails = async (
  id: string,
  address: string,
  username: string
): Promise<boolean> => {
  const input = {
    Key: marshall({
      id: id,
    }),
    TableName: TABLENAME,
  };
  try {
    const command = new GetItemCommand(input);
    const { Item } = await client.send(command);
    const item = unmarshall(Item);
    if (
      item["id"] === id &&
      item["ETH_ADDRESS"] === address &&
      item["USERNAME"] === username
    ) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
//PK36SCBL0000001123456702
const withdraw = async (
  withdrawParams: WithdrawParams
): Promise<WithdrawParamsResult> => {
  const res: WithdrawParamsResult = {
    burnResult: {
      hash: "",
      from: "",
      amount: "",
      result: false,
      message: "",
    },
    withdrawResult: withdrawParams as WithdrawParam,
    result: false,
    message: "",
    errorMessage: "",
  };
  const burnParams: BurnFromParams = {
    address: withdrawParams.address,
    amount: String(withdrawParams.amount),
  };
  try {
    if (
      await verifyUserDetails(
        withdrawParams.id,
        withdrawParams.address,
        withdrawParams.userName
      )
    ) {
      const burnFromResponse: BurnFromResult = await burnFrom(burnParams);
      if (burnFromResponse.result) {
        //WISE Withdraw APIS

        let quote = (await getQuote(withdrawParams.amount)).body;
        quote = JSON.parse(quote);

        const quoteId = quote["id"];
        console.log("🚀 ~ file: withdraw.ts:209 ~ quoteId:", quoteId)

        let create_Recipient = (
          await createRecipient(
            withdrawParams.IBAN,
            withdrawParams.accountHolderName
          )
        ).body;
        create_Recipient = JSON.parse(create_Recipient);
        // console.log("🚀 ~ file: withdraw.ts:217 ~ create_Recipient:", create_Recipient)
        const create_RecipientId = create_Recipient["id"];
        console.log("🚀 ~ file: withdraw.ts:219 ~ create_RecipientId:", create_RecipientId)

  
        let create_Transfer = (await createTransfer(create_RecipientId, quoteId))
        .body;
      create_Transfer = JSON.parse(create_Transfer);
      console.log("🚀 ~ file: withdraw.ts:124 ~ withdraw ~ create_Transfer:", create_Transfer)
      const create_TransferId = create_Transfer["id"];
      console.log(
        "🚀 ~ file: withdraw.ts:126 ~ withdraw ~ create_TransferId:",
        create_TransferId
      );


        let fund_Transfer = (await fundTransfer(create_TransferId)).body;
        // console.log(
        //   "🚀 ~ file: withdraw.ts:172 ~ withdraw ~ fund_Transfer:",
        //   fund_Transfer
        // );
        fund_Transfer = JSON.parse(fund_Transfer);
        console.log(
          "🚀 ~ file: withdraw.ts:174 ~ withdraw ~ fund_Transfer:",
          fund_Transfer
        );

        if (fund_Transfer["status"] === "COMPLETED") {
          res.burnResult = burnFromResponse;
          res.message = "Success";
          res.result = true;
          return res;
        } else {
          res.burnResult = burnFromResponse;
          res.message = "Error occurred while withdrawing to BANK account";
          res.errorMessage = JSON.stringify(fund_Transfer);
          res.result = false;
          return res;
        }
      } else {
        res.message = "Error while burning the currency";
        res.burnResult = burnFromResponse;
        res.result = false;
        return res;
      }
    } else {
      res.message = "User Details not Matched";
      res.result = false;
      return res;
    }
  } catch (error) {
    res.result = false;
    res.errorMessage = JSON.stringify(error);
    res.message = "Error encountered while withdrawing...";
  }
  return res;
};

export default withdraw;
// const params:WithdrawParam={
//   IBAN:"PK36SCBL0000001123456702",
//   accountHolderName:"Muhammad Zohaib",
//   amount:1000,
//   id:"b",
//   userName: "b"
// , address:"0x567f7947bfFA5F0f4e52F7E9aC634a004ff0CE8D"

// }

// withdraw(params)