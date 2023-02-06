import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import { readFileSync, write, writeFileSync } from "fs";
import { resolve, join } from "path";

async function deployProfile(hre: HardhatRuntimeEnvironment) {
  //configs
  const { network, deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number | undefined = network.config.chainId;
  console.log(chainId);
  log("Deploying ..........");

  const profilesDeploy = await deploy("Profiles", {
    from: deployer,
    args: [],
    log: true,
  });

  log(`Profiles Address at ${profilesDeploy.address}`);
}

export default deployProfile;

deployProfile.tags = ["Profiles"];
