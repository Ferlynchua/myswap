// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol";

contract MyToken1 is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("My Token 1", "HUAT") {}
}

contract MyToken2 is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("My Token 2", "SWEE") {}
}