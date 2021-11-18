var web3Accounts = require('web3-eth-accounts');
var express = require('express');
var app = express();

var ETH_ADDRESS = new web3Accounts();
const API_KEY = "creator-nation"

app.get('/',(req,res)=>{
    res.send("Welcome to Creator Nation ETH ADDRESS Generation API");
})

app.get('/new', function (req, res) {
    let apiKey = req.headers['x-api-key']
  
    if (!apiKey || apiKey !== API_KEY) {
      return res.status(403).send({
        success: false,
        message: 'API key is not valid.',
      })
    }

    let new_account = ETH_ADDRESS.create();
    console.log(new_account);
    res.json({private_key: new_account['privateKey'], address: new_account['address'] })
});


app.listen(process.env.PORT || 3000,()=>{
    console.log("Address generating script started at port "+ process.env.PORT || 3000)
})