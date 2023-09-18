//configuro il modulo per connettersi a una rete locale all'indirizzo IP "127.0.0.1" (localhost) sulla porta "7545
//la sezione "solc" riguarda il compilatore Solidity e in essa vengono specificate alcune opzioni di ottimizzazione per il compilatore

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}