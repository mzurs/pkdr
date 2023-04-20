import getRateMaticToUsd from "./api/getRateMaticToUsd";
import topUpAddress from "./api/topUpAddress";
import {PARAMS, TopUpAddressResult} from "./api/types/apiParamsTypes";
async function topUpApi(
  apiName: string,
  params?: PARAMS
): Promise<string | number | undefined|TopUpAddressResult> {
  switch (apiName) {
    case "getContractAddress":
      return;
    case "getRateMaticToUsd":
      return await getRateMaticToUsd();
    case "getTopUpBalance":
      return;
    case "topUpAddress":
      return await topUpAddress(params?.address!);
      // return !params?.address ? 0 : await topUpAddress(params?.address!);
    default:
      return "No api selected";
  }
}

export default topUpApi;
