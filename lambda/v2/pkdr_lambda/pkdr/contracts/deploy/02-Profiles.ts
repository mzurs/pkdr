import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";
const { ethers, upgrades } = require("hardhat");
async function deployProfile(hre: HardhatRuntimeEnvironment) {
  // const V1contract = await ethers.getContractFactory("Profiles");
  // console.log("Deploying V1contract...");
  // const v1contract = await upgrades.deployProxy(V1contract, [], {
  //    gasPrice: 40000,
  //    initializer: "initialize",
  //    kind:'UUPS'
  // });
  // await v1contract.deployed();
  // console.log("V1 Contract deployed to:", v1contract.address);

  //configs
  //@ts-ignore

  const { network, deployments, getNamedAccounts } = hre;

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  console.log(chainId);
  log("Deploying ..........");

  //   const profilesDeploy = await deploy('Profiles', {
  //     from: deployer,
  //     args:[],

  //     proxy:  {
  //         proxyContract: 'ERC1967Proxy',
  //         execute: {
  //             methodName: 'initialize', // Function to call when deployed first time.
  //             args: [

  //             ],
  //         },
  //     },
  //     contract: 'Profiles',
  // })
  const profilesDeploy = await deploy(
    "Profiles",
    {
      contract: "Profiles",
      from: deployer,
      args: [],
      proxy: {
        proxyContract: "ERC1967Proxy",
        proxyArgs: ["{implementation}", "{data}"],
        execute: {
          init: {
            methodName: "initialize",
            args: [],
          },
        },
      },
      log: true,
    },
 
  );
  log(`Profiles Address at ${profilesDeploy.address}`);

  const profileABI = JSON.stringify(profilesDeploy.abi);
  const profileABIPath_I = join(
    __dirname,
    "..",
    "/",
    "..",

    "/",
    "pkdrAPI",
    "/",
    "pkdrConstants",
    "/",
    "profileABI.json"
  );
  console.log(`profileABIPath_I: ${profileABIPath_I}`);
  writeFileSync(profileABIPath_I, profileABI, { encoding: "utf-8" });

  const profileABIPath_II = join(
    __dirname,
    "..",
    "/",
    "..",
    "/",
    "..",
    "/",
    "..",
    "/",
    "users_lambda",
    "/",
    "profileConstants",
    "/",
    "profileABI.json"
  );
  console.log(`profileABIPath_II: ${profileABIPath_II}`);
  writeFileSync(profileABIPath_II, profileABI, { encoding: "utf-8" });

  const profileAddress = profilesDeploy.address;

  const profileAddressPath_I = join(
    __dirname,
    "..",
    "/",
    "..",
    "/",

    "pkdrAPI",
    "/",
    "pkdrConstants",
    "/",
    "profileAddress.json"
  );
  console.log(profileAddressPath_I);
  writeFileSync(profileAddressPath_I, `${JSON.stringify(profileAddress)}`, {
    encoding: "utf-8",
  });

  const profileAddressPath_II = join(
    __dirname,
    "..",
    "/",
    "..",
    "/",
    "..",
    "/",
    "..",
    "/",
    "users_lambda",
    "/",
    "profileConstants",
    "/",
    "profileAddress.json"
  );
  console.log(profileAddressPath_II);
  writeFileSync(profileAddressPath_II, `${JSON.stringify(profileAddress)}`, {
    encoding: "utf-8",
  });
}
//profileConstants
export default deployProfile;

deployProfile.tags = ["Profiles", "all"];
