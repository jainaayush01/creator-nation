document.addEventListener('DOMContentLoaded', async () => {
    Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
    Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";
    var url = window.location.href;
    
    await main()

    async function searchUser1() {
        try {

            $user2 = Moralis.User.current().get("username");
            // alert(JSON.stringify($user2) + "")

            const User = Moralis.Object.extend("CreatorToken");
            const query = new Moralis.Query(User);
            query.equalTo("username", $user1);

            query.find()
                .then(function (results) {
                    // alert(JSON.stringify(results));
                    try {
                        $strm = "";
                        for (let i = 0; i < results.length; i++) {
                            const obj1 = results[i];
                            $username = obj1.get("username").get("username");
                            $menu_ic = "";
                            if ((($user2 + "").localeCompare(($username + ""))) == 0) {
                                $menu_ic = "<div> <a href=\"newtoken.html?rtype=" + obj1.get("tokenName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a><a href=\"newtoken.html?rtype=" + obj1.get("tokenName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a> </div>";
                            }
                            $strm += "<div class=\"token-card\"> <div> </div>" + "  <img src=\"" + obj1.get("tokenFile").url() + "\" class=\"token-img-top\"> <p></p> <div class=\"token-card-body\"> <h5 class=\"token-title\">" + obj1.get('tokenName') + "</h5> <p class=\"token-card-text\"> " + obj1.get('tokenBenefits') + "</p> <a href=\"product.html\"><button type=\"button\" class=\"btn btn-danger btn-lg\">INVEST</button></a> </div></div>";
                        }
                        document.getElementById("token").innerHTML = $strm;
                    } catch ($e) {
                        alert($e + "11");
                    }
                })
                .catch(function (error) {
                    alert(JSON.stringify(error));
                });
        } catch ($e) {
            alert($e + "9");
        }
        try {
            const User = Moralis.Object.extend("Memberships");
            const query = new Moralis.Query(User);
            query.equalTo("username", $user1);

            query.find()
                .then(function (results) {
                    // alert(JSON.stringify(results));
                    try {
                        $strm = "";
                        for (let i = 0; i < results.length; i++) {
                            const obj1 = results[i];
                            $username = obj1.get("username").get("username");
                            $menu_ic = "";
                            if ((($user2 + "").localeCompare(($username + ""))) == 0) {
                                $menu_ic = "<div> <a href=\"newmemberships.html?rtype=" + obj1.get("memTierName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" class=\" token-owner-logo\" align=\"right\"></a> <a href=\"newmemberships.html?rtype=" + obj1.get("memTierName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" class=\" token-owner-logo\" align=\"right\"></a> </div>";
                            }
                            $strm += "<div class=\"token-card\"> <div> </div>" + " <img src=\"" + obj1.get("memTierImage").url() + "\" class=\"token-img-top \"> <p></p> <div class=\"token-card-body \"> <h5 class=\"token-title \">" + obj1.get("memTierName") + "</h5> <P class=\"token-card-cost \"><b>$" + obj1.get("memTierCost") + " per month</b></P> <p class=\"token-card-text \"> " + obj1.get("memTierDesc") + "</p> <button type=\"button \" class=\"btn btn-danger btn-lg \">JOIN</button> </div> </div>";
                        }
                        document.getElementById("member").innerHTML = $strm;
                    } catch ($e) {
                        alert($e + "8");
                    }
                })
                .catch(function (error) {
                    alert(JSON.stringify(error));
                });
        } catch ($e) {
            alert($e + "7");
        }
        try {
            const User = Moralis.Object.extend("Connect");
            const query = new Moralis.Query(User);
            query.equalTo("username", $user1);

            query.find()
                .then(function (results) {
                    // alert(JSON.stringify(results));
                    try {
                        $strm = "";
                        for (let i = 0; i < results.length; i++) {
                            const obj1 = results[i];
                            $username = obj1.get("username").get("username");
                            $menu_ic = "";
                            if ((($user2 + "").localeCompare(($username + ""))) == 0) {
                                $menu_ic = "<div>  <a href=\"newconnect.html?rtype=" + obj1.get("activityName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"> </a>  <a href=\"newconnect.html?rtype=" + obj1.get("activityName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"> </a></div>";
                            }
                            $strm += "<div class=\"token-card \" \"> <div> </div> " + "<img src=\"" + obj1.get("activityFile").url() + "\" class=\"token-img-top \" > <p></p> <div class=\"token-card-body \"> <h5 class=\"token-title \">" + obj1.get("activityName") + "</h5> <P class=\"token-card-cost \"><b>$" + obj1.get("activityCost") + " per month</b></P> <p class=\"token-card-text \"> " + obj1.get("activityDesc") + " </p> <button type=\"button \" class=\"btn btn-danger btn-lg \">JOIN</button> </div> </div>";
                            // alert(JSON.stringify());
                        }
                        document.getElementById("connect").innerHTML = $strm;
                    } catch ($e) {
                        alert($e + "6");
                    }
                })
                .catch(function (error) {
                    alert(JSON.stringify(error));
                });
        } catch ($e) {
            alert($e + "5");
        }
        try {
            const User = Moralis.Object.extend("CollLicensing");
            const query = new Moralis.Query(User);
            query.equalTo("username", $user1);

            query.find()
                .then(function (results) {
                    // alert(JSON.stringify(results));
                    try {
                        $strm = "";
                        for (let i = 0; i < results.length; i++) {
                            const obj1 = results[i];
                            $img = "";
                            try {
                                $img = obj1.get("licensingFile").url();
                            } catch ($e) {

                            }
                            $username = obj1.get("username").get("username");
                            $menu_ic = "";
                            if ((($user2 + "").localeCompare(($username + ""))) == 0) {
                                $menu_ic = "<div> <a href=\"newlicensing.html?rtype=" + obj1.get("licensingName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a> <a href=\"newlicensing.html?rtype=" + obj1.get("licensingName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a> </div>";
                            }
                            // alert(JSON.stringify());
                            $strm += "<div class=\"token-card \" \"> <div> </div>" + "<p></p> <img src=\"" + $img + "\" class=\"collectible-img-top \" alt=\"... \"> <p></p> <div class=\"token-card-body \"> <h5 class=\"collectible-title \">" + obj1.get("licensingName") + "</h5> <P class=\"collectible-card-cost \"><b>$" + obj1.get("licensingCost") + "</b></P> <button type=\"button \" class=\"btn btn-danger btn-lg \">BUY</button> </div></div>";
                        }
                        document.getElementById("lic").innerHTML = $strm;
                    } catch ($e) {
                        alert($e + "3");
                    }
                })
                .catch(function (error) {
                    alert(JSON.stringify(error));
                });
        } catch ($e) {
            alert($e + "2");
        }
    }

    // alert(userId + "");
    $user1 = null;
    // try {
    $user1 = Moralis.User.current();
    if ($user1 == null) {
        window.location.assign("signin.html");
    } else {
        searchUser1();
    }
    // } catch ($e) {
    //     alert($e + "");
    // }
    async function logoutNow() {
        await Moralis.User.logOut();
        window.location.assign("../index.html");
    }
    try {
        let fetchAvailableNFTs = await CnContract.methods.fetchAvailableNFTs().call({from: userAccount});
        console.log(fetchAvailableNFTs);

        let fetchCreatedNFTs = await CnContract.methods.fetchCreatedNFTs().call({from: userAccount});
        console.log(fetchCreatedNFTs);
        
        let fetchBoughtNFTs = await CnContract.methods.fetchBoughtNFTs().call({from: userAccount});
        console.log(fetchBoughtNFTs);
        // let options = {
        //     contractAddress: NFTContractAddress,
        //     abi: NFTContract.abi,
        //     functionName: 'fetchBoughtNFTs'
        // };
        // console.log(NFTContract.abi)
    
        // const boughtNFTs = await(Moralis.executeFunction(options));
        // console.log(boughtNFTs);
    
        // let options2 = {
        //     contractAddress: NFTContractAddress,
        //     abi: NFTContract.abi,
        //     functionName: 'fetchCreatedNFTs'
        // };
    
        // const createdNFTs = await(Moralis.executeFunction(options2));
        // console.log(createdNFTs);
        
        // let options3 = {
        //     contractAddress: NFTContractAddress,
        //     abi: NFTContract.abi,
        //     functionName: 'fetchAvailableNFTs'
        // };
    
        // const availableNFTs = await(Moralis.executeFunction(options3));
        // console.log(availableNFTs);
    
        // let options = {
        //     contractAddress: NFTContractAddress,
        //     abi: NFTContract.abi,
        //     functionName: 'fetchBoughtNFTs',
        //     params: {
        //         creatorAddress: creatorAddress,
        //         tokenName: tokenName,
        //         cost: tokenPrice,
        //         total: tokenSupplyLimit,
        //         uri: uri,
        //         mediaUrl: mediaUrl
        //     }
        // };
    }
    catch (err) {
        console.log(err);
    }
})