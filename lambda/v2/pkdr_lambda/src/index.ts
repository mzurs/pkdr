import mintPKDR from "../pkdr/pkdrAPI/api/mutation/mintPKDR/mintPKDR";
import setProfileAddress from "../pkdr/pkdrAPI/api/mutation/setProfileAddress/setProfileAddress";
import getProfileAddress from "../pkdr/pkdrAPI/api/query/getProfileAddress/getProfileAddress";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    // Mint PKDR function
    case "mintPKDR":
      return await mintPKDR(event.arguments.mint);

    //Set profile address into PKDR Contract Address
    case "setProfileAddress":
      return await setProfileAddress();

    //GET Profile Address from PKDR contract
    case "getProfileAddress":
      return await getProfileAddress();

    // Should return null if no fields matched
    default:
      return null;
  }
};
