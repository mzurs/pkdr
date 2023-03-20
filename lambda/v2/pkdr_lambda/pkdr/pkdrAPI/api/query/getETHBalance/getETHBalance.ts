import { ethers } from "ethers";
import { pkdrABI, pkdrAddress } from "../../../pkdrConstants";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import { parseEther } from "ethers/lib/utils";
const getETHBalance = async (address: string): Promise<string> => {
  const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

  const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );

  const contract = new ethers.Contract(pkdrAddress, pkdrABI, provider);
  const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

  const connectedWallet = contract.connect(wallet);
  try {
    const balance: string = String(
      ethers.utils.formatEther(await connectedWallet.balanceOf(address))
    );
    return balance ? balance : "0";
  } catch (err) {
    console.error(err);
    return JSON.stringify(err);
  }
};

export default getETHBalance;
