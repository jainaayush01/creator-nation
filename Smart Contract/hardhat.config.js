/* hardhat.config.js */
require('dotenv').config()

require("@nomiclabs/hardhat-waffle")



module.exports = {
  solidity: "0.8.3",
  networks: {
    localhost: {
      url: 'http://localhost:7545',
      accounts: [process.env.PRIVATEKEY]
    },
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: [process.env.PRIVATEKEY]
    },
    rinkeby: {
      url: process.env.URL,
      accounts: [process.env.PRIVATEKEY]
    }
  }
};