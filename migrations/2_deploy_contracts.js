var LampController = artifacts.require("./LampController.sol");

module.exports = function(deployer) {
  deployer.deploy(LampController);
};