import { BurnResult } from "../../types/returnTypes";
import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
  _PKDR_PUBLIC_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";

const burn = async (amount: string): Promise<BurnResult> => {
  const res: BurnResult = {
    hash: "",
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
    const amountBurn = ethers.utils.parseUnits(amount);

    const balanceOf: number = parseInt(
      (await connectedWallet.balanceOf(_PKDR_PUBLIC_KEY)).toString()
    );
    if (balanceOf >= parseInt(amountBurn.toString())) {
      const tx = await connectedWallet.burn(amountBurn);
      await listenForTransactionMine(tx, provider);

      res.message = `Successfully Burned ${amountBurn}`;
      res.hash = tx.hash;
      res.amount = amount;
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

export default burn;
