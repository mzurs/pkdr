import mintPKDR from "../pkdr/pkdrAPI/api/mutation/mintPKDR/mintPKDR";
import setProfileAddress from "../pkdr/pkdrAPI/api/mutation/setProfileAddress/setProfileAddress";
import getProfileAddress from "../pkdr/pkdrAPI/api/query/getProfileAddress/getProfileAddress";
import approve from "../pkdr/pkdrAPI/api/mutation/approve/approve";
import getPlatFormFee from "../pkdr/pkdrAPI/api/query/getPlatFormFee/getPlatFormFee";
import setPlatFormFee from "../pkdr/pkdrAPI/api/mutation/setPlatformFee/setPlatformFee";
import transfer from "../pkdr/pkdrAPI/api/mutation/transfer/transfer";
import transferFrom from "../pkdr/pkdrAPI/api/mutation/transferFrom/transferFrom";

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

      case "transfer":
        return await transfer(event.arguments.transferParams);

        case "transferFrom":
          return await transferFrom(event.arguments.transferFromParams)

    case "setPlatFormFee":
      return await setPlatFormFee(event.arguments.fee);

    //GET Profile Address from PKDR contract
    case "getProfileAddress":
      return await getProfileAddress();

    case "getPlatFormFee":
      return await getPlatFormFee();
    // Should return null if no fields matched
    default:
      return null;
  }
};
