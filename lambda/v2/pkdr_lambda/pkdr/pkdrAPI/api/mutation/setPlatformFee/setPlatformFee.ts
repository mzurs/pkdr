import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";
import { SetPlatFormFeeResult } from "../../types/returnTypes";

const setPlatFormFee = async (fee: string): Promise<SetPlatFormFeeResult> => {
  const res: SetPlatFormFeeResult = {
    message: "",
    result: false,
  };
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );
  const pkdrContract = new ethers.Contract(pkdrAddress, pkdrABI, provider);

  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = pkdrContract.connect(wallet);
  try {
    const feeAmount = ethers.utils.parseUnits(fee);
    const tx = await connectedWallet.setPlatFormFee(feeAmount);

    await listenForTransactionMine(tx, provider);
    res.message = `PLATFORM FEE CHANGED TO ${fee} PKDR`;
    res.result = true;
    return res;
  } catch (error) {
    res.message = JSON.stringify((error as unknown as any).message);;

    return res;
  }
  return res;
};
export default setPlatFormFee;
