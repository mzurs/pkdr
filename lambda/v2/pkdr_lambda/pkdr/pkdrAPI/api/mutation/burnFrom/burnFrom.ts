import { BurnFromResult } from "../../types/returnTypes";
import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { BurnFromParams } from "../../types/argsTypes";

const burnFrom = async (
  burnFromParams: BurnFromParams
): Promise<BurnFromResult> => {
  const res: BurnFromResult = {
    hash: "",
    from: "",
    amount: "",
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
    const amount = ethers.utils.parseUnits(burnFromParams.amount);

    const balanceOf: number = parseInt(
      (await connectedWallet.balanceOf(burnFromParams.address)).toString()
    );
    if (balanceOf >= parseInt(amount.toString())) {
      const tx = await connectedWallet.burnFrom(burnFromParams.address, amount);
      await listenForTransactionMine(tx, provider);
      res.from = burnFromParams.address;
      res.message = `Successfully Burned ${amount}`;
      res.hash = tx.hash;
      res.amount = burnFromParams.amount;
      res.result = true;
      return res;
    } else {
      res.message = ` Burn Amount Exceeds Current Balance`;
      res.result = false;
      return res;
    }
  } catch (error) {
    res.message = JSON.stringify((error as unknown as any).message);
    res.result = false;
    return res;
  }

  return res;
};

export default burnFrom;
