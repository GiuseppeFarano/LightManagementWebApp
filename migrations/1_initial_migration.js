//require dello smart contract "Migrations" (In Truffle, gli smart contract vengono chiamati "artifacts")
const Migrations = artifacts.require("Migrations");

// esporta una funzione che verrà eseguita quando si effettua una migrazione tramite Truffle
module.exports = function(deployer) {
  // Il deployer (deployer) è un oggetto che fornisce metodi per gestire il processo di distribuzione degli smart contract
  //Dico a Truffle di distribuire (deploy) lo smart contract "Migrations" sulla blockchain
  deployer.deploy(Migrations);
};
