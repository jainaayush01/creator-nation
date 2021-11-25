document.addEventListener('DOMContentLoaded', async () => {
    Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
    Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
    var url = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    // console.log(params)
    // console.log(window.location)

    async function checkWallet() {

        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("metamask not installed")
                document.querySelector('.buyCrypto').classList.add('hideBtn');
                document.querySelector('.buyFiat').classList.remove('hideBtn');
            } else {
                console.log("eth obj is --> ", ethereum);
                const accounts = await ethereum.request({ method: 'eth_accounts' });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorised account!', account);
                    document.querySelector('.buyCrypto').classList.remove('hideBtn');
                    document.querySelector('.buyFiat').classList.add('hideBtn');

                } else {
                    document.querySelector('.buyCrypto').classList.add('hideBtn');
                    document.querySelector('.buyFiat').classList.remove('hideBtn');
                    console.log('no authorised account found....');
                }
            }
        } catch (err) {
            console.log(err);
        }


    }



    async function connectWallet() {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log('please install metamask');
                document.querySelector('.buyCrypto').classList.add('hideBtn');
                document.querySelector('.buyFiat').classList.remove('hideBtn');
            } else {
                const accounts = await ethereum.request({ method: "eth_requestAccounts" });



                // console.log("Connected", accounts[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }


    checkWallet();
    connectWallet();

    if (window.location.pathname.includes('product')) {
        const CreatorToken = Moralis.Object.extend('CreatorToken');
        const query = new Moralis.Query(CreatorToken);
        query.get(params.objId)
            .then((queryResult) => {
                const productName = document.querySelector('.productName')
                const currentBid = document.querySelector('.currentBid')
                const description = document.querySelector('.description')
                const creatorName = document.querySelector('.creatorName')
                const productImage = document.querySelector('.product-image')
                const productImageDisplay = document.querySelector(".productImageDisplay");
                const paymentModalTokenPrice = document.querySelector("#payment-modal-token-price");
                productName.innerHTML = queryResult.get('tokenName');
                currentBid.innerHTML = '$' + '<div style="display: inline" id="tokenPrice">' + queryResult.get('tokenPrice') + '</div>';
                description.innerHTML = queryResult.get('tokenBenefits');
                creatorName.innerHTML = params.userId
                console.log(queryResult.get('tokenFile')._url)
                if (queryResult.get('tokenFile')._name.split('.')[1] === 'jpg' || queryResult.get('tokenFile')._name.split('.')[1] === 'png') {
                    productImageDisplay.setAttribute('src', queryResult.get('tokenFile')._url)

                } else {
                    productImage.innerHTML = "<video controls> <source src=" + queryResult.get('tokenFile')._url + " type='video/mp4'></video>"
                }
                paymentModalTokenPrice.value = queryResult.get('tokenPrice');

                console.log(queryResult);
                const productId = document.querySelector('.productId')
                productId.innerHTML = '<div id="tokenId">' + queryResult.id + '</div>';
            })
            .catch(err => {
                console.log(err)
            });
    } else if (window.location.pathname.includes('membershipProduct')) {
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
                productImageDisplay.setAttribute('src', queryResult.get('memTierImage')._url)
                paymentModalTokenPrice.value = queryResult.get('tokenPrice');

                console.log(queryResult);
                const productId = document.querySelector('.productId')
                productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
            })
            .catch(err => {
                console.log(err)
            });

    } else if (window.location.pathname.includes('licensingProduct')) {
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
                productImageDisplay.setAttribute('src', queryResult.get('licensingFile')._url)
                paymentModalTokenPrice.value = queryResult.get('tokenPrice');
                console.log(queryResult);
                const productId = document.querySelector('.productId')
                productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
            })
            .catch(err => {
                console.log(err)
            });

    } else if (window.location.pathname.includes('connectProduct')) {
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
                productImageDisplay.setAttribute('src', queryResult.get('activityFile')._url)
                paymentModalTokenPrice.value = queryResult.get('tokenPrice');

                console.log(queryResult);
                const productId = document.querySelector('.productId')
                productId.innerHTML = `<div id="tokenId">${queryResult.id}</div>`
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

    // let NFTContract;
    // const getContractABI = async () => {
    //     NFTContract = await fetch("../../Smart Contract/artifacts/contracts/NFT.sol/CreatorNation.json")
    //         .then(res => res.json())
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     console.log(NFTContract);
    //     return;
    // }
    // getContractABI();

    
    let buyCrypto = document.querySelector("#buyCrypto");

    buyCrypto.onclick = async () => {
        try {
            // if (typeof ethereum !== 'undefined') {
            //     web3 = new Web3(ethereum);
            // } else {
            //     // set the provider you want from Web3.providers
            //     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
            // }

            // let web3 = new Moralis.Web3();
            // const contract = new web3.eth.Contract(NFTContract.abi, NFTContractAddress);
            // let tokenId = document.querySelector("#tokenId")?.innerHTML;
            // tokenId = web3.utils.toBN(tokenId);
            // console.log(contract);
            // console.log(contract.methods.contractURI());
            
            const NFTContract = await fetch("../../Smart Contract/artifacts/contracts/NFT.sol/CreatorNation.json")
                .then(res => res.json())
                .catch(err => {
                    console.log(err);
                });
            const NFTContractAddress = '0x36DF084988e0605C1e2C0329A1432d00d9bfB21f'
            console.log(NFTContract);

            let options = {
                contractAddress: NFTContractAddress,
                abi: NFTContract.abi,
                functionName: 'buyTokensUsingCrypto',
                params: {
                    _tokenId: 1,
                    _amount: 1
                }
            }
            let web3 = await Moralis.enableWeb3();
            // console.log(web3);
            let contract = new web3.eth.Contract(NFTContract.abi, NFTContractAddress);
            console.log(contract);
            console.log(contract.methods.buyTokensUsingCrypto(1, 1));
            let txn = contract.methods.buyTokensUsingCrypto(1, 1);
            txn.call();
            // const buyTokens = await (Moralis.executeFunction(options));
            // console.log(buyTokens);

        }
        catch (err) {
            console.log(err);
        }
    }
});