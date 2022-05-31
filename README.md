## Capstone Project - NFT Social Media Dapp
##### Note - This setup is only for your local system
### Dependencies
 - Install `latest` NodeJS on your system
 - Intall `git` to clone this repository
 - Install `mongodb` on your system and enable the mongod service
### Setup
##### Perform the following actions to setup project
 - Change `path` to `/client` directory in your terminal
 - Run `npm -i` to install all the client dependencies
 - Open a new terminal with same path and run the following command to start a local blockchain
 `npx hardhat node` 
(A list of 20 accounts along with their private keys will be listed on your terminal. Make sure to note them down.)
 - Use your older terminal window to run the deploy script using the following command
 `npx hardhat run src/scripts/deploy.js --network localhost`
 - Now run `npm start` to start the `client`
 - Use another terminal window to navigate to `/server` directory
 - Run `npm -i` to install dependencies
 - Run `npm start` to start the server (Make sure mongod service is running)
### Usage
 - Import some of the accounts into your metamask wallet from the `hardhat node` terminal
 - Use Connect Wallet button to connect your Metamask wallet
 - Use the `Homepage` to explore trending NFTs
 - Use the `Create` link in navbar to mint any NFT
 - `Artwork` link points to your user profile page
 - `Collections` link points to your purchased NFTs
