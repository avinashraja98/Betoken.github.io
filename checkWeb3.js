var hasWeb3 = false;

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
        alert("ACCOUNT FOUND, ADDRESS:" + userAddress);
      }
    });
  }
}
