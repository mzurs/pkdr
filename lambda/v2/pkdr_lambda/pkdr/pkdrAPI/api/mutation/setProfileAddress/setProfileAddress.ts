import { ethers } from "ethers";
import { profileAddress, pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../tx/txConfirmations";

const setProfileAddress = async (): Promise<boolean> => {
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );
  const pkdrContract = new ethers.Contract(pkdrAddress, pkdrABI, provider);

  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = pkdrContract.connect(wallet);
  try {
    const tx = await connectedWallet.setProfileAddress(String(profileAddress));

    await listenForTransactionMine(tx, provider);
    return true;
  } catch (error) {
    return false;
  }
};
export default setProfileAddress;
