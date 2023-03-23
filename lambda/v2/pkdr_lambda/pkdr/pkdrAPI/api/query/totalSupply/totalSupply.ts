//totalSupply
import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
const totalSupply = async (): Promise<string> => {
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(pkdrAddress, pkdrABI, provider);
  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);
  const supply: string = String(
    ethers.utils.formatUnits(await connectedWallet.totalSupply(), 18)
  );
  return supply ? supply : "-";
};

export default totalSupply;
