import { ethers } from "ethers";
import { profileAddress, pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
const getPlatFormFee = async (): Promise<string> => {
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(pkdrAddress, pkdrABI, provider);
  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);

  const platformFee: string = String(await connectedWallet.getPlatFormFee());
  return platformFee ? platformFee : "-";
};

export default getPlatFormFee;
