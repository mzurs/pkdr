import mintPKDR from "../pkdr/pkdrAPI/api/mutation/mintPKDR/mintPKDR";
import setProfileAddress from "../pkdr/pkdrAPI/api/mutation/setProfileAddress/setProfileAddress";
import getProfileAddress from "../pkdr/pkdrAPI/api/query/getProfileAddress/getProfileAddress";
import approve from "../pkdr/pkdrAPI/api/mutation/approve/approve";
import getPlatFormFee from "../pkdr/pkdrAPI/api/query/getPlatFormFee/getPlatFormFee";
import setPlatFormFee from "../pkdr/pkdrAPI/api/mutation/setPlatformFee/setPlatformFee";
import transfer from "../pkdr/pkdrAPI/api/mutation/transfer/transfer";
import transferFrom from "../pkdr/pkdrAPI/api/mutation/transferFrom/transferFrom";
import getETHBalance from "../pkdr/pkdrAPI/api/query/getETHBalance/getETHBalance";
import burnFrom from "../pkdr/pkdrAPI/api/mutation/burnFrom/burnFrom";
import burn from "../pkdr/pkdrAPI/api/mutation/burn/burn";
import topUpAddress from "../topUp/topUpApi/api/topUpAddress";
import totalSupply from "../pkdr/pkdrAPI/api/query/totalSupply/totalSupply";
import getRateUSDPKR from "../topUp/topUpApi/api/getRateUSDPKR";

exports.handler = async (event: any, context: any) => {
  switch (event.info.fieldName) {
    //----------------Mutation-------------------
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
      return await transferFrom(event.arguments.transferFromParams);

    case "setPlatFormFee":
      return await setPlatFormFee(event.arguments.fee);

    case "burn":
      return await burn(event.arguments.amount);

    case "burnFrom":
      return await burnFrom(event.arguments.burnFromParams);

    //----------------Query-------------------
    //GET Profile Address from PKDR contract
    case "getProfileAddress":
      return await getProfileAddress();

    case "getPlatFormFee":
      return await getPlatFormFee();

    case "getETHBalance":
      return await getETHBalance(event.arguments.address);

    case "totalSupply":
      return await totalSupply();

    //----------------------------------------------TOP UP Contract-----------------------------------------------------

    case "topUpAddress":
      return await topUpAddress(event.arguments.address);

    case "getRateUSDPKR":
      return await getRateUSDPKR();

    // Should return null if no fields matched
    default:
      return null;
  }
};
