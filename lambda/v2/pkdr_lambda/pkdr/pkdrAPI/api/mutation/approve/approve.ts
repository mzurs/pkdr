import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
  _PKDR_PUBLIC_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { approveResult } from "../../types/returnTypes";

const approve = async (userPrivateKey: string): Promise<approveResult> => {
  const res: approveResult = {
    message: "",
    result: false,
  };
  try {
    const USERS_PRIVATE_KEY = userPrivateKey;

    const provider = new ethers.providers.JsonRpcProvider(
      _JSON_RPC_PROVIDER_MUMBAI
    );

    const pkdrContract = new ethers.Contract(pkdrAddress, pkdrABI, provider);

    const wallet = new ethers.Wallet(USERS_PRIVATE_KEY, provider);

    const connectedWallet = pkdrContract.connect(wallet);

    const tx = await connectedWallet.approve(_PKDR_PUBLIC_KEY, "123");

    await listenForTransactionMine(tx, provider);
    res.message = "APPROVED Successfully";
    res.result = true;

    return res;
  } catch (error) {
    res.message = JSON.stringify((error as unknown as any).message);
    res.result = false;
    return res;
  }

  return res;
};

export default approve;
