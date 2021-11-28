document.addEventListener('DOMContentLoaded', async () => {

    Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
    Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";
    document.querySelector("#tokenButton").onclick = createNow;

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
        console.log(token);
        console.log(token.id)
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

        const tokenName = document.getElementById("tokenName").value;
        const tokenPrice = document.getElementById("tokenPrice").value;
        const tokenSupplyLimit = document.getElementById("tokenSupplyLimit").value;
        const mediaUrl = tokenPic;
        const uri = "hello"
        const tokenRoyalities = document.getElementById("tokenRoyalties").value;

        token.set('tokenName', tokenName);
        token.set('tokenPrice', tokenPrice);
        token.set('tokenBenefits', tokenQuill);
        token.set('tokenSupplyLimit', tokenSupplyLimit);
        token.set('tokenRoyalties', tokenRoyalities);
        token.set('username', Moralis.User.current());
        
        console.log({ tokenSupplyLimit })

        try {
            // let options = {
            //     contractAddress: NFTContractAddress,
            //     abi: NFTContract.abi,
            //     functionName: 'mint',
            //     params: {
            //         creatorAddress: creatorAddress,
            //         tokenName: tokenName,
            //         cost: tokenPrice,
            //         total: tokenSupplyLimit,
            //         uri: uri,
            //         mediaUrl: mediaUrl
            //     }
            // }
            // let web3 = await Moralis.enableWeb3();
            // const contractURL = await (Moralis.executeFunction(options));
            // console.log(contractURL);

            var tokenMint = await CnContract.methods.mint(userAccount, tokenName, tokenPrice, tokenSupplyLimit, uri, mediaUrl).send({ from: userAccount });
            console.log(tokenMint);
            console.log(tokenMint.events.onMint.returnValues.tokenID);
            token.set('tokenId', tokenMint.events.onMint.returnValues.tokenID);
            await token.save();
            console.log(token);
            console.log(token.tokenId);
            // await CnContract.events.onMint((res) => {
            //     // console.log({sender, tokenName, id, cost, total})
            //     console.log(res);
            // });
            // console.log(cn);
            // window.location.assign("../index.html");
        }
        catch (err) {
            console.log(err);
            let see = await token.destroy();
            console.log(see);
        }

    }
});