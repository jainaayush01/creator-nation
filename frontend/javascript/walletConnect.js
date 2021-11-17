const walletconnect = WalletConnectClient.Client
console.log(walletconnect)
const client = await walletconnect.init({
    relayProvider: "wss://relay.walletconnect.org",
    apiKey: "d5b25bc94c75f5f6bb20b2968cd89915",
    metadata: {
      name: "Creator-Nation",
      description: "Platform for creators",
      url: "#",
      icons: ["https://walletconnect.com/walletconnect-logo.png"],
    },
});

console.log(client);

client.on(
    WalletConnectClient.CLIENT_EVENTS.pairing.proposal,
    async (proposal) => {
        console.log(proposal)
      // uri should be shared with the Wallet either through QR Code scanning or mobile deep linking
      const { uri } = proposal.signal.params;
      WalletConnectQRCodeModal.default.open(uri)
    }
  );

 

document.getElementById("btn-connect").addEventListener("click",  async()=>{
    const session = await client.connect({
        permissions: {
          blockchain: {
            chains: ["eip155:1"],
          },
          jsonrpc: {
            methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
          },
        },
    }); 
})