import { ethers, getNamedAccounts, deployments } from "hardhat";

async function main() {
  const { deployer } = await getNamedAccounts();
  const { log, get } = deployments;

  const profilesDeployed = await ethers.getContract("Profiles", deployer);

  console.log(`Got contract Profiles at ${profilesDeployed.address}`);

  const adminAddresses = await profilesDeployed.getAdminAddresses({});
  console.log(`Admin Addresses: ${adminAddresses}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
