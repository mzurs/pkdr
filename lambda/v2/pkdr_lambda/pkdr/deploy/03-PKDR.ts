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
const profilesDeploy=
await deploy('PKDR', {
  contract: 'PKDR',
  from: deployer,
  args: [],
  proxy: {
    proxyContract: 'ERC1967Proxy',
    proxyArgs: ['{implementation}', '{data}'],
    execute: {
      init: {
        methodName: 'initialize',
        args: [],
      },
    },
  },
  log: true,
});


  log(`Profiles Address at ${profilesDeploy.address}`);
}

export default deployProfile;

deployProfile.tags = ["Profiles","all"];
