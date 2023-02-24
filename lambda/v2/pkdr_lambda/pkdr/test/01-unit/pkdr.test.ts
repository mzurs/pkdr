import { assert, expect, use } from "chai";
import { Contract } from "ethers";
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

describe("                                                                             Contract Unit Test", function () {
  let user_Admin: any,
    user_A: any,
    user_B: any,
    pkdrContract: Contract,
    profileContract: Contract;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    user_Admin = accounts[0];
    // console.log("🚀 ~ file: pkdr.test.ts:15 ~ user_Admin:", user_Admin)
    user_A = accounts[1];
    // console.log("🚀 ~ file: pkdr.test.ts:16 ~ user_A:", user_A)
    user_B = accounts[2];
    // console.log("🚀 ~ file: pkdr.test.ts:18 ~ user_B:", user_B)

    await deployments.fixture("all");
    profileContract = await ethers.getContract("Profiles", user_Admin);
    // console.log(`Profile Address: ${profileContract.address}`);

    pkdrContract = await ethers.getContract("PKDR", user_Admin);
    // console.log(`PKDR contract address: ${pkdrContract.address}`);
  });

  describe("---------Address Configuration---------------------", () => {
    it("Profile was deployed", async () => {
      assert(profileContract.address);
    });

    it("PKDR was deployed", async () => {
      assert(pkdrContract.address);
    });

    it("Add Profile Contract to PKDR Contract", async () => {
      await pkdrContract.setProfileAddress(profileContract.address);
      expect(await pkdrContract.getProfileAddress()).to.equal(
        profileContract.address
      );
    });
  });

  describe("---------------Mint PKDR--------------------------", () => {
    it("Only Owner can Mint the PKDR", async () => {
      assert(await pkdrContract.mint(user_Admin.address, 100));
    });
    it("Minting from other user should've Fail the Transaction", async () => {
      const userA = pkdrContract.connect(user_A);
      await expect(userA.mint(user_A.address, 100)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

});
