//  Create WalletConnect Provider
const provider = new WalletConnectProvider.default({
  infuraId: "e992178cee28442e86aa8c6611d7d472",
  rpc: {
    80001: "https://matic-mumbai.chainstacklabs.com"
  },
  
});
console.log(provider);

document.getElementById("btn-connect").addEventListener("click", async()=>{
  //  Enable session (triggers QR Code modal)
  try{
    await provider.enable();
    console.log(provider);
    //  Create Web3 instance
    window.web3 = new Web3(provider);
    sign()
    document.getElementById("connected").style.display="block";
    document.getElementById("prepare").style.display="none";
  }catch(err){
    console.log("Modal Closed");
  }

})

// Subscribe to accounts change
provider.on("accountsChanged", (accounts) => {
  console.log(accounts);
});

// Subscribe to chainId change
provider.on("chainChanged", (chainId) => {
  console.log(chainId);
});

// Subscribe to session disconnection
provider.on("disconnect", (code, reason) => {
  console.log(code, reason);
});

document.getElementById("btn-disconnect").addEventListener("click", async()=>{
  try{
    await provider.disconnect()
    window.web3 = new Web3();
    document.getElementById("connected").style.display="none";
    document.getElementById("prepare").style.display="block";
  }catch(err){
  }
})

async function sign(){
  if(provider.connected){
    document.getElementById("connected").style.display="block";
    document.getElementById("prepare").style.display="none";
    console.log(provider);
      // const chainId = await window.web3.eth.chainId();
      // console.log(chainId);
      const signedMessage = await provider.request("sign","Hello To Creator Nation");
      console.log(signedMessage);
  }
}
