import { TransferFromResult } from "../../types/returnTypes";
import { BigNumber, ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
  _PKDR_PUBLIC_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { TransferFromParams } from "../../types/argsTypes";

const transferFrom = async (
  transferFromParams: TransferFromParams
): Promise<TransferFromResult> => {
  const MINIMUM_AMOUNT = ethers.utils.parseUnits("2");

  const res: TransferFromResult = {
    from: "",
    to: "",
    amount: "",
    message: "",
    result: false,
    hash: "",
  };

  try {
    const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

    const provider = new ethers.providers.JsonRpcProvider(
      _JSON_RPC_PROVIDER_MUMBAI
    );

    const pkdrContract = new ethers.Contract(pkdrAddress, pkdrABI, provider);

    const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);
    const connectedWallet = pkdrContract.connect(wallet);

    const amount = ethers.utils.parseUnits(transferFromParams.amount);

    const balanceOf: number = parseInt(
      (await connectedWallet.balanceOf(transferFromParams.from)).toString()
    );

    if (parseInt(amount.toString()) >= parseInt(MINIMUM_AMOUNT.toString())) {
      if (balanceOf >= parseInt(amount.toString())) {
        const tx = await connectedWallet.transferFrom(
          transferFromParams.from,
          transferFromParams.to,
          amount
        );

        await listenForTransactionMine(tx, provider);

        res.from = transferFromParams.from;
        res.to = transferFromParams.to;
        res.amount = `Amount ${parseInt(
          amount.toString()
        )} and Balance: ${balanceOf}`;
        res.message = `Successfully transfer ${transferFromParams.amount} PKDR`;
        res.result = true;
        res.hash = tx.hash;

        return res;
      } else {
        res.hash = "null";
        res.message = "Transfer Amount Exceeds Current Balance";
        res.result = false;
        res.from = transferFromParams.from;
        res.to = transferFromParams.to;
        res.amount = String(amount);
        return res;
      }
    } else {
      res.hash = "null";
      res.message = "Minimum Transfer should be of 2 PKDR";
      res.result = false;
      res.from = transferFromParams.from;
      res.to = transferFromParams.to;
      res.amount = String(amount);
      return res;
    }
  } catch (error) {
    res.message = JSON.stringify((error as unknown as any).message);
    res.result = false;
    return res;
  }

  return res;
};

export default transferFrom;
