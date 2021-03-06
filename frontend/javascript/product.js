document.addEventListener('DOMContentLoaded', async () => {
    Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
    Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";
    var url = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    var tokenId;
    if (window.location.pathname.includes('membershipproduct')) {
        const Memberships = Moralis.Object.extend('Memberships');
        const query = new Moralis.Query(Memberships);
        query.get(params.objId)
            .then((queryResult) => {
                const productName = document.querySelector('.productName')
                const currentBid = document.querySelector('.currentBid')
                const description = document.querySelector('.description')
                const creatorName = document.querySelector('.creatorName')
                const productImageDisplay = document.querySelector('.productImageDisplay')
                const paymentModalTokenPrice = document.querySelector("#payment-modal-token-price");
                productName.innerHTML = queryResult.get('memTierName');
                currentBid.innerHTML = '$' + '<div style="display: inline" id="tokenPrice">' + queryResult.get('memTierCost') + '</div>';
                description.innerHTML = queryResult.get('memTierCost');
                creatorName.innerHTML = params.userId
                paymentModalTokenPrice.value = queryResult.get('memTierCost');

                console.log(queryResult);
                // const productId = document.querySelector('.productId')
                // productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
                tokenId = parseInt(queryResult.get('tokenId'));
                localStorage.setItem('tokenId', tokenId);
                productImageDisplay.setAttribute('src', queryResult.get('memTierImage')._url)
            })
            .catch(err => {
                console.log(err)
            });

    } else if (window.location.pathname.includes('licensingproduct')) {
        const CollLicensing = Moralis.Object.extend('CollLicensing');
        const query = new Moralis.Query(CollLicensing);
        query.get(params.objId)
            .then((queryResult) => {
                const productName = document.querySelector('.productName')
                const currentBid = document.querySelector('.currentBid')
                const description = document.querySelector('.description')
                const creatorName = document.querySelector('.creatorName')
                const productImageDisplay = document.querySelector('.productImageDisplay')
                const paymentModalTokenPrice = document.querySelector("#payment-modal-token-price");
                productName.innerHTML = queryResult.get('licensingName');
                currentBid.innerHTML = '$' + '<div style="display: inline" id="tokenPrice">' + queryResult.get('licensingCost') + '</div>';
                description.innerHTML = 'Licensing Type: ' + queryResult.get('licensingType') + "Licensing Agreement: " + queryResult.get('licensingAgreement');
                creatorName.innerHTML = params.userId
                
                paymentModalTokenPrice.value = queryResult.get('a');
                console.log(queryResult);
                // const productId = document.querySelector('.productId')
                // productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
                tokenId = parseInt(queryResult.get('tokenId'));
                localStorage.setItem('tokenId', tokenId);
                productImageDisplay.setAttribute('src', queryResult.get('licensingFile')._url)
            })
            .catch(err => {
                console.log(err)
            });

    } else if (window.location.pathname.includes('connectproduct')) {
        const Connect = Moralis.Object.extend('Connect');
        const query = new Moralis.Query(Connect);
        query.get(params.objId)
            .then((queryResult) => {
                const productName = document.querySelector('.productName')
                const currentBid = document.querySelector('.currentBid')
                const description = document.querySelector('.description')
                const creatorName = document.querySelector('.creatorName')
                const productImageDisplay = document.querySelector('.productImageDisplay')
                const paymentModalTokenPrice = document.querySelector("#payment-modal-token-price");
                productName.innerHTML = queryResult.get('activityName');
                currentBid.innerHTML = '$' + '<div style="display: inline" id="tokenPrice">' + queryResult.get('activityCost') + '</div>';
                description.innerHTML = 'Activity Date: ' + queryResult.get('activityDate') + "Activity Limit: " + queryResult.get('activityLimitNum');
                creatorName.innerHTML = params.userId
                paymentModalTokenPrice.value = queryResult.get('activityCost');
                
                console.log(queryResult);
                // const productId = document.querySelector('.productId')
                // productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
                tokenId = parseInt(queryResult.get('tokenId'));
                localStorage.setItem('tokenId', tokenId);
                productImageDisplay.setAttribute('src', queryResult.get('activityFile')._url)
            })
            .catch(err => {
                console.log(err)
            });

    } else if (window.location.pathname.includes('product')) {
        const CreatorToken = Moralis.Object.extend('CreatorToken');
        const query = new Moralis.Query(CreatorToken);
        query.get(params.objId)
            .then((queryResult) => {
                // console.log());
                const productName = document.querySelector('.productName')
                const currentBid = document.querySelector('.currentBid')
                const description = document.querySelector('.description')
                const creatorName = document.querySelector('.creatorName')
                const productImage = document.querySelector('.product-image')
                const productImageDisplay = document.querySelector(".productImageDisplay");

                const paymentModalTokenPrice = document.querySelector("#payment-modal-token-price");
                console.log("TOKEN NAME ",queryResult.get('tokenName'))
                console.log("Token Price ",queryResult.get('tokenPrice'))
                console.log("Token Benefits ",queryResult.get('tokenBenefits'))
                console.log("Token File ",queryResult.get('tokenFile'))
                console.log("Token ID ",queryResult.get('tokenId'))
                console.log("Token ID ",queryResult.id)
                productName.innerHTML = queryResult.get('tokenName');
                currentBid.innerHTML = '$' + '<div style="display: inline" id="tokenPrice">' + queryResult.get('tokenPrice') + '</div>';
                description.innerHTML = queryResult.get('tokenBenefits');
                creatorName.innerHTML = params.userId
                paymentModalTokenPrice.value = queryResult.get('tokenPrice');

                console.log(queryResult);
                const productId = document.querySelector('.productId')
                productId.innerHTML = '<div id="tokenId">' + queryResult.id + '</div>';
                tokenId = parseInt(queryResult.get('tokenId'));
                localStorage.setItem('tokenId', tokenId);
                console.log(queryResult.get('tokenFile')._url)
                if (queryResult.get('tokenFile')._name.split('.')[1] === 'jpg' || queryResult.get('tokenFile')._name.split('.')[1] === 'png') {
                    productImageDisplay.setAttribute('src', queryResult.get('tokenFile')._url)

                } else {
                    productImage.innerHTML = "<video controls> <source src=" + queryResult.get('tokenFile')._url + " type='video/mp4'></video>"
                }

            })
            .catch(err => {
                console.log(err)
            });
    }

    let paymentModal = document.querySelector("#payment-modal");
    let buyStripe = document.querySelector("#buyStripe");
    let close = document.querySelector(".close");

    buyStripe.onclick = () => {
        paymentModal.style.display = "block";
    }

    close.onclick = () => {
        paymentModal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == paymentModal) {
            paymentModal.style.display = "none";
        }
    }

    let buyCrypto = document.querySelector("#buyCrypto");
    buyCrypto.onclick = async () => {
        try {
            if (window.location.pathname.includes('product')) {
                let tokenPrice = document.querySelector("#tokenPrice").innerHTML;
                console.log(tokenPrice);
                console.log({ tokenPrice: parseInt(tokenPrice) });
                console.log(parseInt(tokenId))
                let maticPrice = 1000;
                let maticPrice2 = await ChainlinkContract.methods.getLatestPrice().call();
                console.log(maticPrice2);
                const priceInUSD = x => parseFloat(x / Math.pow(10, 8));
                console.log(priceInUSD(maticPrice2))

                let buyTokensCrypto = await CnContract.methods.buyTokensUsingCrypto(tokenId, 1).send({ from: userAccount, value: web3.utils.toWei((tokenPrice/priceInUSD(maticPrice2)).toString(), "ether")});
                console.log(buyTokensCrypto);
            }
            else if (window.location.pathname.includes('membershipProduct')) {
                let Memberships = Moralis.Object.extend('Memberships')
                let query = new Moralis.Query(Memberships);
                query.equalTo("objectId", params.objId);
                console.log(query);
                let data = await query.find();
                console.log(data);
                let userId = data[0].get("username").id;
                console.log(userId)
                let User = Moralis.Object.extend('_User');
                let userQuery = new Moralis.Query(User);
                userQuery.equalTo("objectId", userId);
                let userData = await userQuery.find();
                console.log(userData);
                let tokenOwnerAddress = userData[0].get("ethAddress");
                console.log(tokenOwnerAddress);
                let tokenPrice = document.querySelector("#tokenPrice").innerHTML;
                console.log(tokenPrice);
                console.log(userAccount);
                let maticPrice = 100;
                let maticPrice2 = await ChainlinkContract.methods.getLatestPrice().call();
                console.log(maticPrice2);
                const priceInUSD = x => parseFloat(x / Math.pow(10, 8));
                console.log(priceInUSD(maticPrice2))

                try {
                    let txn = await web3.eth.sendTransaction({ from: userAccount, to: tokenOwnerAddress, value: web3.utils.toWei((tokenPrice/priceInUSD(maticPrice2)).toString(), "ether")});
                    console.log(txn);
                }catch(err){
                    console.log(err);
                }

            }
            else if (window.location.pathname.includes('licensingProduct')) {
                let tokenPrice = document.querySelector("#tokenPrice").innerHTML;
                console.log(tokenPrice);
                console.log({ tokenPrice: parseInt(tokenPrice) });
                let buyTokensCrypto = CnContract.methods.buyTokensUsingCrypto(tokenId, 1).send({ from: userAccount, value: web3.utils.toWei((tokenPrice/priceInUSD(maticPrice2)).toString(), "ether") });
                console.log(buyTokensCrypto);
            }
            else if (window.location.pathname.includes('connectProduct')) {
                let Connect = Moralis.Object.extend('Connect')
                let query = new Moralis.Query(Connect);
                query.equalTo("objectId", params.objId);
                console.log(query);
                let data = await query.find();
                console.log(data);
                let userId = data[0].get("username").id;
                console.log(userId)
                let User = Moralis.Object.extend('_User');
                let userQuery = new Moralis.Query(User);
                userQuery.equalTo("objectId", userId);
                let userData = await userQuery.find();
                console.log(userData);
                let tokenOwnerAddress = userData[0].get("ethAddress");
                console.log(tokenOwnerAddress);
                let tokenPrice = document.querySelector("#tokenPrice").innerHTML;
                console.log(tokenPrice);
                console.log(userAccount);
                let maticPrice = 100;
                let maticPrice2 = await ChainlinkContract.methods.getLatestPrice().call();
                console.log(maticPrice2);
                try {
                    let txn = await web3.eth.sendTransaction({ from: userAccount, to: tokenOwnerAddress, value: web3.utils.toWei((tokenPrice/priceInUSD(maticPrice2)).toString(), "ether")});
                    console.log(txn);
                }catch(err){
                    console.log(err);
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }
});
