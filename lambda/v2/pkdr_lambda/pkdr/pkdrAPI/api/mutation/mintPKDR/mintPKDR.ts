import { mintResult } from "../../types/returnTypes";
import { ethers } from "ethers";
import { profileAddress, pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { mintInfo } from "../../types/argsTypes";
import { parseUnits } from "ethers/lib/utils";

const mintPKDR = async (mint: mintInfo): Promise<mintResult> => {
  const res: mintResult = {
    message: "",
    result: false,
  };

  try {
    const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

    const provider = new ethers.providers.JsonRpcProvider(
      _JSON_RPC_PROVIDER_MUMBAI
    );
    const pkdrContract = new ethers.Contract(pkdrAddress, pkdrABI, provider);

    const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

    const connectedWallet = pkdrContract.connect(wallet);
    const amount = ethers.utils.parseUnits(mint.amount);
    const tx = await connectedWallet.mint(mint.address, amount);
    await listenForTransactionMine(tx, provider);

    res.message = `Successfully Minted ${amount} --->${mint.address} `;
    res.result = true;
    return res;
  } catch (error) {
    res.message = JSON.stringify((error as unknown as any).message);
    res.result = false;
    return res;
  }

  return res;
};

export default mintPKDR;
