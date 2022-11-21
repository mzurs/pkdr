import {ethers} from 'ethers';
import { _JSON_RPC_PROVIDER_MUMBAI,_PKDR_PRIVATE_KEY } from './api/constant/constant';
import { profilesABI,profilesContractAddress } from '../zkConstant';
import { UserObject } from './typesAPI/type';


const provider = new ethers.providers.JsonRpcProvider(
    _JSON_RPC_PROVIDER_MUMBAI
  );
  
  const contract = new ethers.Contract(
    profilesContractAddress,
    profilesABI,
    provider
  );
  
  const wallet = new ethers.Wallet(_PKDR_PRIVATE_KEY, provider);
  
  const connectedWallet = contract.connect(wallet);
  
async function zkProfileCreation(params:UserObject):Promise<string> {
    
    const createPRofileResult: boolean = await connectedWallet.createProfile(
        params.publicAddress,
        true,
        { gasLimit: 50000 }
      );
      return createPRofileResult?"Profile Created":"Profile Not Created"
    }
export default zkProfileCreation;