// import walletconnect from "@walletconnect/client";
// import QRCodeModal from "@walletconnect/qrcode-modal";
const walletconnect = WalletConnect.default;
const QRCodeModal = WalletConnectQRCodeModal.default;
// Create a connector
const connector = new walletconnect({
  bridge: "https://bridge.walletconnect.org", // Required
  // chainId: 80001,
  // rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  qrcodeModal: QRCodeModal,
});

// Check if connection is already established
if (!connector.connected) {
  // create new session
  console.log(connector);
  connector.createSession();
}

// Subscribe to connection events
connector.on("connect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get provided accounts and chainId
  const { accounts, chainId } = payload.params[0];
  console.log(accounts, chainId);
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});


if(connector.connected){
  console.log(connector);
  const tx = {
    from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
    to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
    data: "0x", // Required
    gasPrice: "0x02540be400", // Optional
    gas: "0x9c40", // Optional
    value: "0x00", // Optional
    nonce: "0x0114", // Optional
  };
  
  // Send transaction
  connector
    .sendTransaction(tx)
    .then((result) => {
      // Returns transaction id (hash)
      console.log(result);
    })
    .catch((error) => {
      // Error returned when rejected
      console.error(error);
    });
}