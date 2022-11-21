// SPDX-License-Identifier: MIT 
 //// This file is MIT Licensed.
//
// Copyright 2017 Christian Reitwiessner
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
pragma solidity ^0.8.0;
library Pairing {
    struct G1Point {
        uint X;
        uint Y;
    }
    // Encoding of field elements is: X[0] * z + X[1]
    struct G2Point {
        uint[2] X;
        uint[2] Y;
    }
    /// @return the generator of G1
    function P1() pure internal returns (G1Point memory) {
        return G1Point(1, 2);
    }
    /// @return the generator of G2
    function P2() pure internal returns (G2Point memory) {
        return G2Point(
            [10857046999023057135944570762232829481370756359578518086990519993285655852781,
             11559732032986387107991004021392285783925812861821192530917403151452391805634],
            [8495653923123431417604973247489272438418190587263600148770280649306958101930,
             4082367875863433681332203403145435568316851327593401208105741076214120093531]
        );
    }
    /// @return the negation of p, i.e. p.addition(p.negate()) should be zero.
    function negate(G1Point memory p) pure internal returns (G1Point memory) {
        // The prime q in the base field F_q for G1
        uint q = 21888242871839275222246405745257275088696311157297823662689037894645226208583;
        if (p.X == 0 && p.Y == 0)
            return G1Point(0, 0);
        return G1Point(p.X, q - (p.Y % q));
    }
    /// @return r the sum of two points of G1
    function addition(G1Point memory p1, G1Point memory p2) internal view returns (G1Point memory r) {
        uint[4] memory input;
        input[0] = p1.X;
        input[1] = p1.Y;
        input[2] = p2.X;
        input[3] = p2.Y;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 6, input, 0xc0, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
    }


    /// @return r the product of a point on G1 and a scalar, i.e.
    /// p == p.scalar_mul(1) and p.addition(p) == p.scalar_mul(2) for all points p.
    function scalar_mul(G1Point memory p, uint s) internal view returns (G1Point memory r) {
        uint[3] memory input;
        input[0] = p.X;
        input[1] = p.Y;
        input[2] = s;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 7, input, 0x80, r, 0x60)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require (success);
    }
    /// @return the result of computing the pairing check
    /// e(p1[0], p2[0]) *  .... * e(p1[n], p2[n]) == 1
    /// For example pairing([P1(), P1().negate()], [P2(), P2()]) should
    /// return true.
    function pairing(G1Point[] memory p1, G2Point[] memory p2) internal view returns (bool) {
        require(p1.length == p2.length);
        uint elements = p1.length;
        uint inputSize = elements * 6;
        uint[] memory input = new uint[](inputSize);
        for (uint i = 0; i < elements; i++)
        {
            input[i * 6 + 0] = p1[i].X;
            input[i * 6 + 1] = p1[i].Y;
            input[i * 6 + 2] = p2[i].X[1];
            input[i * 6 + 3] = p2[i].X[0];
            input[i * 6 + 4] = p2[i].Y[1];
            input[i * 6 + 5] = p2[i].Y[0];
        }
        uint[1] memory out;
        bool success;
        assembly {
            success := staticcall(sub(gas(), 2000), 8, add(input, 0x20), mul(inputSize, 0x20), out, 0x20)
            // Use "invalid" to make gas estimation work
            switch success case 0 { invalid() }
        }
        require(success);
        return out[0] != 0;
    }
    /// Convenience method for a pairing check for two pairs.
    function pairingProd2(G1Point memory a1, G2Point memory a2, G1Point memory b1, G2Point memory b2) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](2);
        G2Point[] memory p2 = new G2Point[](2);
        p1[0] = a1;
        p1[1] = b1;
        p2[0] = a2;
        p2[1] = b2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for three pairs.
    function pairingProd3(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](3);
        G2Point[] memory p2 = new G2Point[](3);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        return pairing(p1, p2);
    }
    /// Convenience method for a pairing check for four pairs.
    function pairingProd4(
            G1Point memory a1, G2Point memory a2,
            G1Point memory b1, G2Point memory b2,
            G1Point memory c1, G2Point memory c2,
            G1Point memory d1, G2Point memory d2
    ) internal view returns (bool) {
        G1Point[] memory p1 = new G1Point[](4);
        G2Point[] memory p2 = new G2Point[](4);
        p1[0] = a1;
        p1[1] = b1;
        p1[2] = c1;
        p1[3] = d1;
        p2[0] = a2;
        p2[1] = b2;
        p2[2] = c2;
        p2[3] = d2;
        return pairing(p1, p2);
    }
}

contract Verifier {
    using Pairing for *;
    struct VerifyingKey {
        Pairing.G1Point alpha;
        Pairing.G2Point beta;
        Pairing.G2Point gamma;
        Pairing.G2Point delta;
        Pairing.G1Point[] gamma_abc;
    }
    struct Proof {
        Pairing.G1Point a;
        Pairing.G2Point b;
        Pairing.G1Point c;
    }
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x121dea2003dac8aa2baeae5d8dee2052328691bdee5717e736b77ce396345ec6), uint256(0x0f37b05546738277227aa63b293ec4285ee1192e01873f68a111e3b4600149c4));
        vk.beta = Pairing.G2Point([uint256(0x13ccd92bdc33483f3fa5a4a38b96834b9fef2b0558c78f399e7a2973d15a8e88), uint256(0x2d145a1f4f9b0f3dc42273be8e3fcf34930f5670c726088740d7dd5e4822aee2)], [uint256(0x02b52526f75ed1fe5b03769130e149c07a433553708d80b554c1ec037e6d7032), uint256(0x0bf20ee57ed941c5181bfd58f87bdbc553fd3e010f7560d25e05fd5ef188784f)]);
        vk.gamma = Pairing.G2Point([uint256(0x1e405a4cf99c4a3a0be99c01d807d1664ef06729d21e0d50c5ea8f8c11fd53fa), uint256(0x06d4e45adb0c42fc2c05dab3387abcd89dfd978b7bdf9980de704dd4d0f29be5)], [uint256(0x00bc801e790b05b519e25f9bb8269ad745621043bfcab5687e02212f8a7d8811), uint256(0x1011da860d689654a007691a91a3fb014d5464061cd8e2e0bc50ba441a3aaef6)]);
        vk.delta = Pairing.G2Point([uint256(0x304fbd44dbd70cb1d736e6558978c76802801fd7986ca524a68df9ce32eb6475), uint256(0x1c8eb29eeead2654a46629563e52845aa3b5848e750fc77208ec9f28aef93c71)], [uint256(0x1b1efc53e87343444be2c42a4d7768917233fee13084c9020094464c3510a424), uint256(0x26800f993d777b258fb7385b2d679da1d3cbae9a018c8dad5a84d743ea47f1fb)]);
        vk.gamma_abc = new Pairing.G1Point[](7);
        vk.gamma_abc[0] = Pairing.G1Point(uint256(0x1a89c9051669417fa6a19ab45cf1852a11326ce57159abd3531c6e9847f51ae0), uint256(0x17ed6377ff8c8e059b65a3bb7cb796df76d2e13dadfcdecbf91a17b6c6c0d97b));
        vk.gamma_abc[1] = Pairing.G1Point(uint256(0x15ead711d0d6d48cd632d7b06b69eddb1c9437a68c46fa21525a4ae1f2cac352), uint256(0x11cc31d5ba3627819553c641c09f7f40cf96fa7bbe4e0f95fbd7b385ef617770));
        vk.gamma_abc[2] = Pairing.G1Point(uint256(0x25378d2e23b0bd41faeb62f4dd2c45f8ea1968410081845429a85137040a772d), uint256(0x02eb455cd776dce32844bee685a2388478957b5c26d2a1a0d7b5646d772904ec));
        vk.gamma_abc[3] = Pairing.G1Point(uint256(0x2dd62a69c8b6ce30bd3778b95740368f812b11d6c19855031ea8d995646fd1cf), uint256(0x2d5b4af562fadc9946c0694abf9dc7c735344e86b851e086234f5eb6ec3c2619));
        vk.gamma_abc[4] = Pairing.G1Point(uint256(0x1a48fd2b7ef267d52ba3eedb126c718c8321314fa3515466fb15de4a8de519d6), uint256(0x0890af94c078859d169850505cc3079dfb4302011387b6e44019adafadc83ecc));
        vk.gamma_abc[5] = Pairing.G1Point(uint256(0x15fc424aefd7e710a85e9e0f6d31102d7801872a70b56e8be93bd2a7b49f25aa), uint256(0x0784960cdfc9832fc25570a08f17d1e079156f183eec258f8c397aa7b5989670));
        vk.gamma_abc[6] = Pairing.G1Point(uint256(0x072117958b53798f66af57e5d33f962a3a4234a2d011c4bf8a0e76c81094fb6a), uint256(0x24764148380fdf2277ebd536e39278142cf49d161f1ca0c71cd8809866ffdb82));
    }
    function verify(uint[] memory input, Proof memory proof) internal view returns (uint) {
        uint256 snark_scalar_field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
        VerifyingKey memory vk = verifyingKey();
        require(input.length + 1 == vk.gamma_abc.length);
        // Compute the linear combination vk_x
        Pairing.G1Point memory vk_x = Pairing.G1Point(0, 0);
        for (uint i = 0; i < input.length; i++) {
            require(input[i] < snark_scalar_field);
            vk_x = Pairing.addition(vk_x, Pairing.scalar_mul(vk.gamma_abc[i + 1], input[i]));
        }
        vk_x = Pairing.addition(vk_x, vk.gamma_abc[0]);
        if(!Pairing.pairingProd4(
             proof.a, proof.b,
             Pairing.negate(vk_x), vk.gamma,
             Pairing.negate(proof.c), vk.delta,
             Pairing.negate(vk.alpha), vk.beta)) return 1;
        return 0;
    }
    function verifyTx(
            Proof memory proof, uint[6] memory input
        ) public view returns (bool r) {
        uint[] memory inputValues = new uint[](6);
        
        for(uint i = 0; i < input.length; i++){
            inputValues[i] = input[i];
        }
        if (verify(inputValues, proof) == 0) {
            return true;
        } else {
            return false;
        }
    }
}
