import { ethers } from "ethers";
import { profileAddress, profileABI } from "../../../profileConstants/index";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";

const getUsersCount = async (): Promise<number> => {
  try {
    const PKDR_PRIVATE_KEY = _PKDR_PRIVATE_KEY;

    const provider = new ethers.providers.JsonRpcProvider(
      _JSON_RPC_PROVIDER_MUMBAI
    );
    const profileContract = new ethers.Contract(
      profileAddress,
      profileABI,
      provider
    );

    const wallet = new ethers.Wallet(PKDR_PRIVATE_KEY, provider);

    const connectedWallet = profileContract.connect(wallet);
    const totalUsersCount = await connectedWallet.getUsersCount();

    return parseInt(totalUsersCount);
  } catch (error) {
    return 0;
  }
  return -1;
};

export default getUsersCount;
