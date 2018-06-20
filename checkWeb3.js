var hasWeb3 = false;
var hasLogin = false;
var networkName;

var userAddress = "";

async function checkWeb3() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== "undefined") {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    hasWeb3 = true;
  } else {
    alert("No web3? You should consider trying MetaMask!");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(
      new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/m7Pdc77PjIwgmp7t0iKI"
      )
    );
  }

  checkAccount();
}

function checkAccount() {
  if (hasWeb3) {
    web3.eth.getAccounts(function(err, res) {
      console.log("All Accounts:" + res);
      if (res == "") {
        alert("PLS LOGIN");
      } else {
        web3.eth.defaultAccount = res[0];
        userAddress = res[0];
        hasLogin = true;
        alert("ACCOUNT FOUND, ADDRESS:" + userAddress);
        correctNetwork();
      }
    });
  }
}

function correctNetwork() {
  web3.version.getNetwork((err, netId) => {
    if (netId != 4) {
      alert("Switch to Rnkeby test network");
    } else {
      window.location.replace("app");
    }
  });
}
