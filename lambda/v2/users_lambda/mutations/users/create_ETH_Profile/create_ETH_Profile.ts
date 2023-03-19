import { ethers } from "ethers";
import { profileAddress, profileABI } from "../../../profileConstants/index";
import {
  _JSON_RPC_PROVIDER_MUMBAI,
  _PKDR_PRIVATE_KEY,
} from "../../../constants/constants";
import listenForTransactionMine from "../../../tx/txConfirmations";
import { parseUnits } from "ethers/lib/utils";
import { Create_ETH_Profile_Result } from "../../../data_types/types/t_return/t_user";

const create_ETH_Profile = async (
  address: string
): Promise<Create_ETH_Profile_Result> => {
  const res: Create_ETH_Profile_Result = {
    message: "",
    result: false,
  };
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
    const tx = await connectedWallet.createProfile(address);
    await listenForTransactionMine(tx, provider);
    res.message = "ETH Profile created successfully";
    res.result = true;
    return res;
  } catch (error) {
    res.message = JSON.stringify(error);
    res.result = false;
    return res;
  }
  return res;
};

export default create_ETH_Profile;
