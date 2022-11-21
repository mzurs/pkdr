import { CreateProfile, UserObject } from "./typesAPI/type";
import createProfile from "./api/createProfile";
import revokeVerifiedUser from "./api/revokeVerifiedUser";
import signatures from "./signatures";
import getVerifiedUser from "./api/getVerifiedUser";
const zkAPI = async (
  apiName: string,
  params: UserObject
): Promise<string | boolean> => {
  switch (apiName) {
    case "createProfile1":
      return apiName;
      // return await createProfile(params);
    // const res=await getVerifiedUser(params.publicAddress);
    // return res;
    // return (await getVerifiedUser(params.publicAddress))
    //   ? "User Already Exists"
    //   : ((await signatures(params))
    //   ? await createProfile(params)
    //   : "Signatures not Matches");

    case "revokeVerifiedUser":
      return await revokeVerifiedUser(params.publicAddress);

    case "getVerifiedUser":
      return await getVerifiedUser(params.publicAddress);
    case "pro":
      return await createProfile(params);

    default:
      return "Wrong API Selection";
  }
};

export default zkAPI;
