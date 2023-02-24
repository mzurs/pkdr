// import { assert, expect, use } from "chai";
// import { Contract } from "ethers";
// const { network, getNamedAccounts, deployments, ethers } = require("hardhat");

// describe("                                                                             Contract Stage Test", function () {
//   let user_Admin: any,
//     user_A: any,
//     user_B: any,
//     pkdrContract: Contract,
//     profileContract: Contract;

//   beforeEach(async function () {
//     const accounts = await getNamedAccounts();
//     user_Admin = accounts.deployer;
//     user_A = accounts.user_A;
//     user_B = accounts.user_B;

//     await deployments.fixture("all");
//     profileContract = await ethers.getContract("Profiles", user_Admin);
//     console.log(`Profile Address: ${profileContract.address}`);

//     pkdrContract = await ethers.getContract("PKDR", user_Admin);
//     console.log(`PKDR contract address: ${pkdrContract.address}`);
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
//       assert(await pkdrContract.mint(user_Admin, 1000));
//     });
//     it("Minting from other user should've Fail the Transaction", async () => {
//       const userA = pkdrContract.connect(user_A);
//       expect(await userA.mint(user_A, 1000)).to.be.revertedWithPanic(
//         "Ownable: caller is not the owner"
//       );
//     });
//   });
// });
