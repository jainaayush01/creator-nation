Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
var web3;
var CnContract;
var userAccount; // plz give me this
var accountAddress = userAccount;
var verifiedConnect = false;
var walletType;

//  Create WalletConnect Provider
const provider = new WalletConnectProvider.default({
  infuraId: "e992178cee28442e86aa8c6611d7d472",
  rpc: {
    80001: "https://matic-mumbai.chainstacklabs.com"
  },
  
});

document.getElementById("btn-connect").addEventListener("click", connectWalletConnect);

async function connectWalletConnect(){
  //  Enable session (triggers QR Code modal)
  console.log("Connecting With Wallet Connect");
  try{
    await provider.enable();
    console.log("Wallet Connect Address:",provider.accounts[0]);
    verifyOrUploadEthAddress(provider.accounts[0]);
    //  Create Web3 instance
    web3 = new Web3(provider);

    let network=await web3.eth.net.getNetworkType();;
    let account=await web3.eth.getAccounts();
    console.log("Wallet Connect Network: "+ network);
    console.log("Wallet Connect Address: " +account);

    document.getElementById("connected").style.display="block";
    document.getElementById("prepare").style.display="none";
  }catch(err){
    console.log("Modal Closed");
  }

}

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
  document.getElementById("connected").style.display="none";
  document.getElementById("prepare").style.display="block";
});

document.getElementById("btn-disconnect").addEventListener("click", async()=>{
  try{
    await provider.disconnect()
    web3 = new Web3();
    document.getElementById("connected").style.display="none";
    document.getElementById("prepare").style.display="block";
  }catch(err){
  }
})

async function sign(){
  if(verifiedConnect){
    console.log("signing")
      console.log(web3)
      let accounts = await web3.eth.getAccounts()
      let abt = await CnContract.methods.buyTokensUsingCrypto(1,1).encodeABI();

      let tx ={
        from: userAccount,
        to: '0xFfeD6cd9BDDF59F2b33C89a3edCFd365B0665451',
        value: 0,
        data: await CnContract.methods.buyTokensUsingCrypto(1,1).encodeABI()
      }
      // const signedMessage = await web3.eth.SendTransaction(tx,account);
      console.log(abt);
      const signedTx = await web3.eth.signTransaction(tx);
      console.log(signedTx)

      // const result = await provider.connector.signMessage([accounts[0], "hello"]);
      // console.log(provider.connector)
      // console.log(result)
  }
}

async function verifyOrUploadEthAddress(address){
  if(Moralis.User.current()){
    let user2 = Moralis.User.current().get("username");
    try{
      const User = Moralis.Object.extend("User");
      const query = new Moralis.Query(User);
      query.equalTo("username", user2);
      const results = await query.find();
      let userDataObj = results[0]; 
      var userAddress = userDataObj.get("ethAddress")
      if(!userAddress){
        userDataObj.set("ethAddress", address);
        let result = await userDataObj.save();
        localStorage.setItem('userEthAddress', address);
        console.log("SuccessFully Set User Address", result);
        verifiedConnect =true;
      }else{
        console.log("Already Found Address: ",userAddress);
        if(userAddress!=address){
          alert("Registered Address and Wallet Address Does not Match, Please Connect with Right address and Try Again");
          provider.disconnect();
        }
        else {
          localStorage.setItem('userEthAddress', address);
          verifiedConnect =true;
          userAccount = userAddress;
        }
      }
    }catch(err){
      console.log(err)
    }
    
  }
  else{
    console.log("Not LogedIn")
  }
}


async function connectMetaMask(){
  console.log("Connecting Metamask....")
  
  try {
    web3 = await Moralis.enableWeb3();
  } catch (error) {
    alert("Please Connect Metamask!!");
  }

  let network=await web3.eth.net.getNetworkType();;
  let account=await web3.eth.getAccounts();
  console.log("Metamask Wallet Network: "+ network);
  console.log("Metamask Account Address: " +account);
  await verifyOrUploadEthAddress(account[0].toLowerCase());

  console.log("Metamask Connected!");

}

async function connectContract(){
  console.log("Conencting Contract...")
  let res = await fetch("../../Smart Contract/artifacts/contracts/NFT.sol/CreatorNation.json")
  let NFTContractData = await res.json();
  let NFTContractAddress = '0xFfeD6cd9BDDF59F2b33C89a3edCFd365B0665451'   
  CnContract = new web3.eth.Contract(NFTContractData.abi, NFTContractAddress);
  console.log("Contract Connected")

}

async function showConnect(){
  
  if(Moralis.User.current()){ // If User Is logged In then only
    if(Moralis.User.current().get("authData")){ // If user logged in with Metamask
      document.getElementById("prepare").style.display="none";
      await connectMetaMask();
      await connectContract();
      walletType = "METAMASK";
    }else{// If Logged in With Email- Wallet connect way
      await connectWalletConnect();
      await connectContract();
      walletType = "WALLETCONNECT";
    }
  }else{
    document.getElementById("prepare").style.display="none";
  }
}

async function main(){
  await showConnect();
  // await sign();
  console.log(verifiedConnect)
}

main()