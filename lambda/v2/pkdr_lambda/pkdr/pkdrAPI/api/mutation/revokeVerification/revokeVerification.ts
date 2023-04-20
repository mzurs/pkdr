import { ethers } from "ethers";
import { profileABI, profileAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
  _PKDR_PUBLIC_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { TABLENAME } from "../../../../../../constants";
const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();
type GetAddress = {
  message: string;
  result: boolean;
};

async function getUserNameAddress(USERNAME: string): Promise<string | boolean> {
  const params = {
    TableName: TABLENAME,
    IndexName: "getAddressByUserNameIndex",
    KeyConditionExpression: "#USERNAME = :USERNAME",
    ExpressionAttributeNames: { "#USERNAME": "USERNAME" },
    ExpressionAttributeValues: { ":USERNAME": USERNAME },
  };

  try {
    const { Items } = await docClient.query(params).promise();
    if (typeof Items[0].USERNAME == "string") {
      return Items[0].ETH_ADDRESS;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
const getAddress = async (userName: string): Promise<GetAddress> => {
  const res = {
    message: "",
    result: false,
  };
  const response = await getUserNameAddress(userName);
  if (typeof response == "string") {
    res.result = true;
    res.message = response;
    return res;
  } else {
    res.message = "Error getting address of userName";
    res.result = false;
    return res;
  }
};

type RevokeVerificationResult = {
  message: string;
  result: boolean;
};

const revokeVerification = async (
  userName: string
): Promise<RevokeVerificationResult> => {
  //   console.log(await getAddress("zohaib"));

  const addressResult = await getAddress(userName);
  if (addressResult.result) {
    const res: RevokeVerificationResult = {
      message: "",
      result: false,
    };

    const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

    const provider = new ethers.providers.JsonRpcProvider(
      _JSON_RPC_PROVIDER_MUMBAI
    );

    const pkdrContract = new ethers.Contract(
      profileAddress,
      profileABI,
      provider
    );

    const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);
    const connectedWallet = pkdrContract.connect(wallet);

    try {
      const tx = await connectedWallet.revokeVerifiedUser(
        addressResult.message
      );
      await listenForTransactionMine(tx, provider);

      res.message = `Verification of ${userName} Revoked successfully`;
      res.result = true;
      return res;
    } catch (error) {
      res.message = (error as any).message;
      res.result = false;
      return res;
    }
  } else {
    return addressResult as RevokeVerificationResult;
  }
};

export default revokeVerification;
