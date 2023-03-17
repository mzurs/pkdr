import mintPKDR from "../pkdr/pkdrAPI/api/mutation/mintPKDR/mintPKDR";
import setProfileAddress from "../pkdr/pkdrAPI/api/mutation/setProfileAddress/setProfileAddress";
import getProfileAddress from "../pkdr/pkdrAPI/api/query/getProfileAddress/getProfileAddress";
import approve from "../pkdr/pkdrAPI/api/mutation/approve/approve";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    // Mint PKDR function
    case "mintPKDR":
      return await mintPKDR(event.arguments.mint);

    case "approve":
      return await approve(event.arguments.privateKey);
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
