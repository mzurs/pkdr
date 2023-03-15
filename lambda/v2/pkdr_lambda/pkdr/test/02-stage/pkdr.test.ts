// import { assert, expect, use } from "chai";
// import { Contract } from "ethers";
// import { parseEther, parseUnits } from "ethers/lib/utils";
// const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

// describe("                                                                             PKDR Unit Test", function () {
//   let user_Admin: any,
//     user_A: any,
//     user_B: any,
//     pkdrContract: Contract,
//     profileContract: Contract;

//   beforeEach(async function () {
//     const accounts = await ethers.getSigners();
//     user_Admin = accounts[0];
//     // //console.log("🚀 ~ file: pkdr.test.ts:15 ~ user_Admin:", user_Admin)
//     user_A = accounts[1];
//     // //console.log("🚀 ~ file: pkdr.test.ts:16 ~ user_A:", user_A)
//     user_B = accounts[2];
//     // //console.log("🚀 ~ file: pkdr.test.ts:18 ~ user_B:", user_B)

//     await deployments.fixture("all");
//     profileContract = await ethers.getContract("Profiles", user_Admin);
//     // //console.log(`Profile Address: ${profileContract.address}`);
//     // await profileContract.createProfile(user_A.address);
//     // await profileContract.createProfile(user_B.address);
//     pkdrContract = await ethers.getContract("PKDR", user_Admin);
//     // //console.log(`PKDR contract address: ${pkdrContract.address}`);
//     await pkdrContract.setProfileAddress(profileContract.address);
//     const admin = pkdrContract.connect(user_Admin);
//     await admin.mint(user_A.address, parseUnits("100"));
//     await admin.mint(user_B.address, parseUnits("100"));
//   });

//   describe("---------Address Configuration---------------------", () => {
//     it("Profile was deployed", async () => {
//       assert(profileContract.address);
//     });

//     it("PKDR was deployed", async () => {
//       assert(pkdrContract.address);
//     });

//     it("Add Profile Contract to PKDR Contract", async () => {
//       await pkdrContract.setProfileAddress(profileContract.address);
//       expect(await pkdrContract.getProfileAddress()).to.equal(
//         profileContract.address
//       );
//     });
//   });

//   describe("---------------Mint PKDR--------------------------", () => {
//     it("Only Owner can Mint the PKDR", async () => {
//       assert(await pkdrContract.mint(user_Admin.address, 100));
//     });
//     it("Minting from other user should've Fail the Transaction", async () => {
//       const userA = pkdrContract.connect(user_A);
//       await expect(userA.mint(user_A.address, 100)).to.be.revertedWith(
//         "Ownable: caller is not the owner"
//       );
//     });
//   });

//   describe("---------------Approve PKDR--------------------------", () => {
//     it("Approve PKDR to Owner should succeeds", async () => {
//       const userA = pkdrContract.connect(user_A);
//       const userB = pkdrContract.connect(user_B);
//       const admin = pkdrContract.connect(user_Admin);

//       assert(await userA.approve(userA.address, 100));
//       assert(await userA.approve(userB.address, 100));

//       //console.log(await admin.allowance(user_A.address, user_Admin.address));
//       //console.log(await admin.allowance(user_B.address, user_Admin.address));
//     });
//   });

//   describe("---------------Transfer PKDR--------------------------", () => {
//     it("Transferring from admin to User A and User B should succeed and both have total 400 ether", async () => {
//       const admin = pkdrContract.connect(user_Admin);
//       await admin.mint(user_A.address, parseUnits("100"));
//       await admin.mint(user_B.address, parseUnits("100"));

//       //console.log(await pkdrContract.balanceOf(user_A.address));
//       //console.log(await pkdrContract.balanceOf(user_B.address));

//       expect(await pkdrContract.balanceOf(user_A.address)).to.equal(
//         parseUnits("200")
//       );
//       expect(await pkdrContract.balanceOf(user_A.address)).to.equal(
//         parseUnits("200")
//       );
//       expect(await pkdrContract.totalSupply()).to.be.equal(parseEther("400"));
//     });
//     it("Transferring from userA to userB should not succeed", async () => {
//       const userA = pkdrContract.connect(user_A);
//       await expect(userA.transfer(user_B.address, 10)).to.be.revertedWith(
//         "Ownable: caller is not the owner"
//       );

//       it("UserB Balance should equal 110", async () => {
//         await expect(pkdrContract.balanceOf(user_B.address)).to.equal(
//           parseEther("10")
//         );
//       });
//     });
//   });

//   describe("---------------create profiles for PKDR--------------------------", () => {
//     it("profiles for User_A and User set to create", async () => {
//       let admin = profileContract.connect(user_Admin);
//       expect(await admin.createProfile(user_A.address))
//         .to.emit(profileContract, "PROFILE_CREATED")
//         .withArgs(user_A.address);
//       expect(await admin.createProfile(user_B.address))
//         .to.emit(profileContract, "PROFILE_CREATED")
//         .withArgs(user_B.address);
//       assert.equal(await admin.getVerifiedUser(user_A.address), true);
//       assert.equal(await admin.getVerifiedUser(user_B.address), true);

//       const userA = pkdrContract.connect(user_A);
//       const userB = pkdrContract.connect(user_B);

//       //aprove admin
//       assert(await userA.approve(userA.address, parseUnits("100")));
//       assert(await userA.approve(userB.address, parseUnits("100")));
//       assert(await pkdrContract.mint(user_Admin.address, parseUnits("100")));

//       // console.log(await pkdrContract.getProfileAddress());
//       admin = pkdrContract.connect(user_Admin);
//       await admin.transferFrom(
//         user_A.address,
//         user_B.address,
//         parseUnits("10")
//       );
//     });
//   });

//   describe("---------------Level I Verification--------------------------", () => {
//     let admin: Contract, userA, userB, adminPKDR;
//     beforeEach(async () => {
//       admin = profileContract.connect(user_Admin);
//       expect(await admin.createProfile(user_A.address))
//         .to.emit(profileContract, "PROFILE_CREATED")
//         .withArgs(user_A.address);
//       expect(await admin.createProfile(user_B.address))
//         .to.emit(profileContract, "PROFILE_CREATED")
//         .withArgs(user_B.address);
//       assert.equal(await admin.getVerifiedUser(user_A.address), true);
//       assert.equal(await admin.getVerifiedUser(user_B.address), true);

//       userA = pkdrContract.connect(user_A);
//       userB = pkdrContract.connect(user_B);

//       //aprove admin
//       assert(await userA.approve(userA.address, parseUnits("100")));
//       assert(await userA.approve(userB.address, parseUnits("100")));
//       assert(await pkdrContract.mint(user_Admin.address, parseUnits("100")));

//       // console.log(await pkdrContract.getProfileAddress());
//       adminPKDR = pkdrContract.connect(user_Admin);
//       await adminPKDR.transferFrom(
//         user_A.address,
//         user_B.address,
//         parseUnits("10")
//       );
//     });

//     it("User A verification revoked should stopped transfer to User B", async () => {
//       await admin.revokeVerifiedUser(user_A.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });

//     it("User B verification revoked should stopped transfer to User B", async () => {
//       await admin.revokeVerifiedUser(user_B.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });

//     it("User A and B verification revoked should stopped transfer to User B", async () => {
//       await admin.revokeVerifiedUser(user_A.address);
//       await admin.revokeVerifiedUser(user_B.address);

//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });
//     it("Retain verification for user_A and user_B should succeed the transfer", async () => {
//       await admin.revokeVerifiedUser(user_A.address);
//         await admin.revokeVerifiedUser(user_B.address);

//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;

//       await admin.retainVerification(user_A.address);
//       await admin.retainVerification(user_B.address);
      
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.not.reverted;
//     });

//     it("User A Multisignature revoked should stopped transfer to User B", async () => {
//       await admin.revokeMultiSignature(user_A.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });
//     it("User B Multisignature revoked should stopped transfer to User A", async () => {
//       await admin.revokeMultiSignature(user_B.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });
//     it("User A and B Multisignature revoked should stopped transfer ", async () => {
//       await admin.revokeMultiSignature(user_A.address);
//       await admin.revokeMultiSignature(user_B.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;
//     });
//     it("User A and B Multisignature Retained should succeed the transfer ", async () => {
//       await admin.revokeMultiSignature(user_A.address);
//       await admin.revokeMultiSignature(user_B.address);
//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.reverted;

//       await admin.retainMultiSignature(user_A.address);
//       await admin.retainMultiSignature(user_B.address);

//       await expect(
//         pkdrContract.transferFrom(
//           user_A.address,
//           user_B.address,
//           parseUnits("10")
//         )
//       ).to.be.not.reverted;
//     });
//   });
// });
