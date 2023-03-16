import { assert, expect, use } from "chai";
import { Contract } from "ethers";
import {
  formatBytes32String,
  keccak256,
  parseBytes32String,
} from "ethers/lib/utils";
import { deployments } from "hardhat";

// Import the necessary libraries and dependencies
const { expect: any } = require("chai");
const { ethers } = require("hardhat");

// Define the test suite
describe("                                                                             Profile Unit Test", function () {
  let user_Admin: any, user_A: any, user_B: any, profileContract: Contract;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    user_Admin = accounts[0];
    // //console.log("🚀 ~ file: pkdr.test.ts:15 ~ user_A_Admin:", user_A_Admin)
    user_A = accounts[1];
    // //console.log("🚀 ~ file: pkdr.test.ts:16 ~ user_A_A:", user_A_A)
    user_B = accounts[2];
    // //console.log("🚀 ~ file: pkdr.test.ts:18 ~ user_A_B:", user_A_B)

    await deployments.fixture("all");
    profileContract = await ethers.getContract("Profiles", user_Admin);
    // //console.log(`Profile Address: ${profileContract.address}`);
    // await profileContract.createProfile(user_A_A.address);
    // await profileContract.createProfile(user_A_B.address);
    // pkdrContract = await ethers.getContract("PKDR", user_A_Admin);
    // //console.log(`PKDR profileContract address: ${pkdrContract.address}`);
    // await pkdrContract.setProfileAddress(profileContract.address);
    // const admin = pkdrContract.connect(user_A_Admin);
  });
  describe("---------------Profile Creation--------------------------", () => {
    // Test the createProfile function
    it("Should create a new profile", async function () {
      // Create a new profile for the user_A
      await profileContract.createProfile(user_A.address);

      // Check that the user_A's verification status is set to true
      assert.equal(await profileContract.getVerifiedUser(user_A.address), true);
    });
  });

  describe("---------------Level I Verification--------------------------", () => {
    // Test the revokeVerifiedUser function
    it("Should revoke a user_A's verification status", async function () {
      // Create a new profile for the user_A
      profileContract = profileContract.connect(user_Admin);
      await profileContract.createProfile(user_A.address);

      // Revoke the user_A's verification status
      await profileContract.revokeVerifiedUser(user_A.address);

      // Check that the user_A's verification status is set to false
      assert.equal(
        await profileContract.getVerifiedUser(user_A.address),
        false
      );
    });

    // Test the retainVerification function
    it("Should retain a user_A's verification status", async function () {
      // Create a new profile for the user_A
      await profileContract.createProfile(user_A.address);

      // Revoke the user_A's verification status
      await profileContract.revokeVerifiedUser(user_A.address);

      // Retain the user_A's verification status
      await profileContract.retainVerification(user_A.address);

      // Check that the user_A's verification status is set to true
      assert.equal(await profileContract.getVerifiedUser(user_A.address), true);
    });
  });

  describe("---------------Multi-Signature Verification--------------------------", () => {
    // Test the revokeMultiSignature function
    it("Should revoke a user_A's multi-signature status", async function () {
      // Create a new profile for the user_A
      await profileContract.createProfile(user_A.address);

      // Revoke the user_A's multi-signature status
      await profileContract.revokeMultiSignature(user_A.address);

      // Check that the user_A's multi-signature status is set to "NULL"
      assert.equal(
        await profileContract.getMultiSig(user_A.address),
        "0xbb4e1f8434f661d4c52cce6e51dba6eb9c909f0b452eb22968b55416ecb18fb5"
      );
      console.log(await profileContract.getMultiSig(user_A.address));
    });

    // Test the retainMultiSignature function
    it("Should retain a user_A's multi-signature status", async function () {
      // Create a new profile for the user_A
      await profileContract.createProfile(user_A.address);

      // Revoke the user_A's multi-signature status
      await profileContract.revokeMultiSignature(user_A.address);

      // Retain the user_A's multi-signature status
      await profileContract.retainMultiSignature(user_A.address);

      // Check that the user_A's multi-signature status is set to "APPROVED"
      assert.equal(
        await profileContract.getMultiSig(user_A.address),
        "0xe321069d1ac41cdfb1421ffa231cd2dc5e3a334703a998a5f84566b6fbf3f7bd"
      );
    });
  });

  // Test the retainZkVerification function
  describe("---------------Level II Verification--------------------------", () => {
    // Test the revokeZkVerification function
    it("Should revoke a user's ZK verification status", async function () {
      // Create a new profile for the user
      await profileContract.createProfile(user_A.address);
      await profileContract.retainZkVerification(user_A.address);

      // Revoke the user's ZK verification status
      await profileContract.revokeZkVerification(user_A.address);

      // Check that the user's ZK verification status is set to false
      expect(
        (await profileContract.getUser(user_A.address)).verificationStatus_II
      ).to.equal(false);
    });

    // it("should retain the verification status of a user", async function () {
    //   await profileContract.createProfile(user_A.address);
    //   await profileContract.retainZkVerification(user_A.address);

    //   await profileContract.revokeZkVerification(user_A.address);
    //   const isVerifiedBefore = await profileContract.getVerifiedUser(
    //     user_A.address
    //   );
    //   assert.equal(
    //     isVerifiedBefore.verificationStatus_II,
    //     false,
    //     "User should not be verified before retaining"
    //   );
    //   await profileContract.retainZkVerification(user_A.address);
    //   const isVerifiedAfter = await profileContract.getUser(user_A.address);
    //   assert.equal(
    //     isVerifiedAfter.verificationStatus_II,
    //     true,
    //     "User should be verified after retaining"
    //   );
    // });

    // it("should revert if the user is not in the mapping", async function () {
    //   await expect(
    //     profileContract.retainZkVerification(user_A.address)
    //   ).to.be.revertedWith("USER_NOT_EXISTS");
    // });

    // it("should revert if the user's verification status is already retained", async function () {
    //   await profileContract.createProfile(user_A.address);
    //   await profileContract.retainZkVerification(user_A.address);
    //   await expect(
    //     profileContract.retainZkVerification(user_A.address)
    //   ).to.be.revertedWith("ZK_VERIFICATION ALREADY RETAINED");
    // });
  });
});
