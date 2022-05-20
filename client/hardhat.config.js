/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.4",
  paths: {
    sources: "./src/contracts",
    artifacts: "./src/artifacts",
    cache: "./src/cache",
    tests: "./src/test",
  },
};
