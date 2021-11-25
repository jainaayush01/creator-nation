document.addEventListener('DOMContentLoaded', async () => {

    Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
    Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
    document.querySelector("#tokenButton").onclick = createNow;
    let accounts

    async function checkWallet() {

        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("metamask not installed")
                let tokenCreateButton = document.querySelector("#tokenButton");
                tokenCreateButton.disabled = true;
                alert('Install and connect to metamask to create tokens');
            } else {
                console.log("eth obj is --> ", ethereum);
                accounts = await ethereum.request({ method: 'eth_accounts' });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorised account!', account);

                } else {
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

    async function logoutNow() {
        await Moralis.User.logOut();
        window.location.assign("../index.html");
    }


    const urlParams = new URLSearchParams(window.location.search);
    const rtype = urlParams.get('rtype');
    if (rtype != null) {

        const User = Moralis.Object.extend("CreatorToken");
        const query = new Moralis.Query(User);
        query.equalTo("tokenName", rtype);
        // query.fullText('username', $str + "");
        // query.equalTo("email", $str);
        query.find()
            .then(function (results) {
                // alert(JSON.stringify(results));

                try {
                    if (results != null && results.length > 0) {
                        const obj1 = results[0];
                        document.getElementById("tokenName").value = obj1.get("tokenName");
                        document.getElementById("tokenPrice").value = obj1.get("tokenPrice");
                        quill.root.innerHTML = obj1.get("tokenBenefits");
                        document.getElementById("tokenSupplyLimit").value = obj1.get("tokenSupplyLimit");
                        document.getElementById("tokenRoyalties").value = obj1.get("tokenRoyalties");
                        document.getElementById("tokenID").value = obj1.get("tokenName");
                        document.getElementById("sub_bt").value = "Update";

                    }
                } catch ($e) {
                    alert($e + "bkp");
                }
            })
            .catch(function (error) {
                alert(JSON.stringify(error));
            });
    }
    async function createNow() {
        const NewToken = Moralis.Object.extend("CreatorToken");
        const token = new NewToken();
        var tokenQuill = quill.root.innerHTML.trim();

        $tokenId = document.getElementById("tokenID");
        let tokenPic = "";
        const fileUploadControl = $("#tokenFile")[0];
        if (fileUploadControl.files.length > 0) {
            const file = fileUploadControl.files[0];
            const name = "tokenFormPic.jpg";

            tokenPic = new Moralis.File(name, file);
            token.set('tokenFile', tokenPic);
            if (file.size > 2097152) // 2 MB in bytes.
            {
                alert("File size must be under 2MB.");
                return;
            }
        }

        for (const el of document.getElementById('tokenForm').querySelectorAll("[required]")) {
            if (!el.reportValidity()) {
                return;
            }
        }

        token.set('tokenName', document.getElementById("tokenName").value);
        token.set('tokenPrice', document.getElementById("tokenPrice").value);
        token.set('tokenBenefits', tokenQuill);
        token.set('tokenSupplyLimit', document.getElementById("tokenSupplyLimit").value);
        token.set('tokenRoyalties', document.getElementById("tokenRoyalties").value);
        token.set('username', Moralis.User.current());

        const tokenName = document.getElementById("tokenName").value;
        const tokenPrice = parseInt(document.getElementById("tokenPrice").value);
        const tokenSupplyLimit = parseInt(document.getElementById("tokenSupplyLimit").value);
        const mediaUrl = tokenPic;
        const uri = "hello"
        console.log({tokenSupplyLimit})
        const NFTContract = await fetch("../../Smart Contract/artifacts/contracts/NFT.sol/CreatorNation.json")
            .then(res => res.json())
            .catch(err => {
                console.log(err);
            });
        const NFTContractAddress = '0xB31F46049c18771adE8B257f909CbDF7Df4cA51d'
        console.log(NFTContract);

        let creatorAddress = accounts[0];
        console.log(creatorAddress);
        try {
            let web3 = await Moralis.enableWeb3();
            let options = {
                contractAddress: NFTContractAddress,
                abi: NFTContract.abi,
                functionName: 'mint',
                params: {
                    creatorAddress: creatorAddress,
                    tokenName: tokenName,
                    cost: tokenPrice,
                    total: tokenSupplyLimit,
                    uri: uri,
                    mediaUrl: mediaUrl
                }
            }
            // let web3 = await Moralis.enableWeb3();
            const contractURL = await (Moralis.executeFunction(options));
            console.log(contractURL);

            await token.save();
            window.location.assign("../index.html");
        }
        catch (err) {
            console.log(err);
        }

    }
});