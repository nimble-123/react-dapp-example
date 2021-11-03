import logo from "./logo.svg";
import "./App.css";

import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import NimbleToken from "./artifacts/contracts/NimbleToken.sol/NimbleToken.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const nimbleTokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

function App() {
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [amount, setAmount] = useState();
  const [tokenBalance, setTokenBalance] = useState();
  const [nimbleTokenBalance, setNimbleTokenBalance] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        const data = await contract.greet();
        setGreetingValue(data);
        console.log("data: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  async function getBalance(token) {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      switch (token) {
        case "token":
          const contractToken = new ethers.Contract(
            tokenAddress,
            Token.abi,
            provider
          );
          const tokenBalance = await contractToken.balanceOf(account);
          setTokenBalance(tokenBalance.toString());
          console.log("Balance: ", tokenBalance.toString());
          break;
        case "nimble":
          const contract = new ethers.Contract(
            nimbleTokenAddress,
            NimbleToken.abi,
            provider
          );
          const nimbleTokenBalance = await contract.balanceOf(account);
          setNimbleTokenBalance(nimbleTokenBalance.toString());
          console.log("Balance: ", nimbleTokenBalance.toString());
          break;
        default:
          break;
      }
    }
  }

  async function sendCoins(token) {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let transaction;
      switch (token) {
        case "token":
          const tokenContract = new ethers.Contract(
            tokenAddress,
            Token.abi,
            signer
          );
          transaction = await tokenContract.transfer(userAccount, amount);
          await transaction.wait();
          console.log(`${amount} Coins successfully sent to ${userAccount}`);

          break;
        case "nimble":
          const nimbleTokenContract = new ethers.Contract(
            tokenAddress,
            Token.abi,
            signer
          );
          transaction = await nimbleTokenContract.transfer(userAccount, amount);
          await transaction.wait();
          console.log(
            `${amount} Nimble Token (NIT) Coins successfully sent to ${userAccount}`
          );
          break;

        default:
          break;
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <p>Actual Greeting is: {greeting}</p>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(event) => setGreetingValue(event.target.value)}
          placeholder="Set Greeting"
        />

        <br />
        <button onClick={() => getBalance("token")}>Get Balance</button>
        <p>Your balance is: {tokenBalance} Token</p>
        <button onClick={() => sendCoins("token")}>Send Coins</button>
        <input
          onChange={(event) => setUserAccount(event.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
        />

        <br />
        <button onClick={() => getBalance("nimble")}>Get Balance</button>
        <p>Your balance is: {nimbleTokenBalance} Nimble Token (NIT)</p>
        <button onClick={() => sendCoins("nimble")}>Send Coins</button>
        <input
          onChange={(event) => setUserAccount(event.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
        />
      </header>
    </div>
  );
}

export default App;
