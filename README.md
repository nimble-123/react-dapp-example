# Steps to reproduce

- `npx create-react-app react-dapp-example`
- `npx hardhat`
- modify hardhat config
- `npx hardhat compile`
- `npx hardhat node`
- open new terminal
- `npx hardhat run scripts/deploy.js --network localhost`
- connect metamask to local test network
- `yarn start`
- modify `App.js`

## Own token example

- create `Token.sol` in contracts
- update `deploy.js`
- update `App.js`
- `npx hardhat run scripts/deploy.js --network localhost`
- `yarn start`

## Own ERC20 compliant token example

- `yarn add @openzeppelin/contracts`
- create `NimbleToken.sol`
- update `deploy.js`
- update `App.js`
- `npx hardhat run scripts/deploy.js --network localhost`
- `yarn start`

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
