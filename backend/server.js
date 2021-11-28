const express = require('express');
const app = express();
const cors = require('cors');
const { ethers } = require('ethers');
require('dotenv').config();

var privateKey = process.env.MATIC_PRIVATE_KEY;
const NFT = require('./artifacts/contracts/NFT.sol/CreatorNation.json');
const PriceFeed = require('./artifacts/contracts/ChainlinkPriceFeed.sol/MaticPrice.json');
const NFTAddress = process.env.NFT_ADDRESS;
const PriceFeedAddress = process.env.PRICE_FEED_ADDRESS;

let contract
async function callME() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.MATIC_JSON_RPC)
  const ownerWallet = new ethers.Wallet(privateKey, provider)
  console.log(ownerWallet)
  const signer = await provider.getSigner()
  console.log(signer);
  // const signerAddress = await signer.getAddress()
  // console.log(signerAddress)

  contract = new ethers.Contract(NFTAddress, NFT.abi, ownerWallet)
  // console.log(contract.signer.address);
}




// const MATICprovider = new ethers.providers.JsonRpcProvider(process.env.MATIC_JSON_RPC);
// const wallet = new ethers.Wallet(privateKey, MATICprovider);
// console.log(wallet.address);
// console.log(wallet.provider);
// console.log(wallet.publicKey);


// console.log(wallet);

// let NFTContract = new ethers.Contract(NFTAddress, NFT.abi, wallet);
// let PriceFeedContract = new ethers.Contract(PriceFeedAddress, ProceFeed.abi, wallet);
// console.log(wallet);
// console.log(NFTContract.address);
// console.log(PriceFeedContract.address);

// console.log(NFTContract.functions.contractURI);

async function foo() {
  const res = await NFTContract.functions.contractURI();
  console.log(res);
}

const handlePaymentIntentSucceeded = async (paymentIntent, userEthAddress, tokenId, tokenNos) => {
  try {
    // console.log({ paymentIntent, userEthAddress, tokenId, tokenNos });
    await callME();
    const txn = await contract.buyTokensFiat(userEthAddress, parseInt(tokenId), 1);
    console.log(txn);
    txn.wait();
    console.log(txn);
    return txn;
  }
  catch (err) {
    return err;
  }
}

const handleCreateTokens = async (creatorAddress, tokenName, tokenPrice, tokenSupplyLimit, uri, mediaUrl) => {
  try {
    await callME();
    const txn = await contract.mint(creatorAddress, tokenName, tokenPrice, tokenSupplyLimit, uri, mediaUrl);
    txn.wait();
    console.log(txn);
    return txn;
  }
  catch (err) {
    console.log(err);
  }
}



app.use(cors());
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: "stripe-samples/accept-a-payment/custom-payment-flow",
    version: "0.0.2",
    url: "https://github.com/stripe-samples"
  }
});

app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});


app.get('/', (req, res) => {
  res.json({
    "message": "hello World"
  })
});

app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post('/create-tokens', async (req, res) => {
  const { creatorAddress, tokenName, tokenPrice, tokenSupplyLimit, uri, mediaUrl } = req.body;
  try {
    const txn = await handleCreateTokens(creatorAddress, tokenName, tokenPrice, tokenSupplyLimit, uri, mediaUrl);
    res.send(txn);
  }
  catch (err) {
    console.log(err);
    res.send(err);
  }
})

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodType, amount, currency, userEthAddress, tokenId, productType } = req.body;
  console.log({paymentMethodType, amount, currency, userEthAddress, tokenId, productType})

  const params = {
    payment_method_types: [paymentMethodType],
    amount: amount*100*80,
    currency: currency,
  }

  if (paymentMethodType === 'acss_debit') {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'sporadic',
          transaction_type: 'personal',
        },
      },
    }
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    if (productType == "1") {
      console.log('he')
      const txn = await handlePaymentIntentSucceeded(paymentIntent, userEthAddress, tokenId, tokenNos = 1);
      console.log(txn);
    }
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // await foo();
      console.log('💰 Payment captured!');
      // await handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    case 'payment_intent.payment_failed':
      console.log('❌ Payment failed.');
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
    // console.log(event)
  }

  res.json({ received: true });
});

app.listen(8080, () =>
  console.log(`Node server listening at http://localhost:8080`)
);
