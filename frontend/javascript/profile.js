Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
var url = window.location.href;
const urlParams = new URLSearchParams(window.location.search);

const userId = urlParams.get('userId');
const User = Moralis.Object.extend('_User')

const query = new Moralis.Query(User)
query.equalTo("username", userId)

query.find()
    .then((result) => {

        try {
            console.log(result)

            for (var i = 0; i < result.length; i++) {
                const obj1 = result[i]
                const userProfileImageSlug = user.id.substring(4, 8);
                const profile = document.querySelector('.cnProfile');
                const profileImgElement = document.querySelector('.cn-profile-image');
                const profileCoverImgElement = document.querySelector('.cn-cover-image');
                const profileUserName = document.querySelector(".profileName")
                const profileUserBio = document.querySelector(".profileBio")
                console.log(obj1.get('profile_desc'))

                if(!obj1.get('profile_cover')) {
                    profile.innerHTML = '<img class="cn-cover-image" src='+'"https://i.ytimg.com/vi/uFk0mgljtns/maxresdefault.jpg" ' +
                    '/>' + '<img class="cn-profile-image" src='+'"https://avatars.dicebear.com/api/miniavs/user.svg?mood[]=happy" '+
                    'width="136px" height="136px" />' + "<h1 class='profileName' style='text-align: center'>"+userId+"</h1>" + "<p class='profileBio' style='text-align: center'>Sample Bio</p>"
                }
                    profileImgElement.setAttribute("src", obj1.get("profile_dp")._url || "https://avatars.dicebear.com/api/miniavs/"+userProfileImageSlug+".svg?mood[]=happy");
                    profileCoverImgElement.setAttribute("src", obj1.get("profile_cover")._url || "https://i.ytimg.com/vi/uFk0mgljtns/maxresdefault.jpg");

                
                profileUserName.innerText = userId;
                profileUserBio.innerText = obj1.get("profile_desc") || "Mysterious"
            }
        } catch (err) {
            console.log(err);
        }
    })


async function searchUser1() {
    try {

        $user2 = Moralis.User.current().get("username");
        // alert(JSON.stringify() + "")

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
                            $menu_ic = "<div> <a href=\"newtoken.html?rtype=" + obj1.get("tokenName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a>    </div>";
                            // <a href=\"newtoken.html?rtype=" + obj1.get("tokenName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" alt=\"h\" class=\" token-owner-logo\" align=\"right\"></a>
                        }
                        $strm += "<div class=\"token-card\"> <div></div>" + "  <img src=\"" + obj1.get("tokenFile").url() + "\" class=\"token-img-top\"> <p></p> <div class=\"token-card-body\"> <h5 class=\"token-title\">" + obj1.get('tokenName') + "</h5> <p class=\"token-card-text\"> " + obj1.get('tokenBenefits') + "</p> <a href=\"product.html?userId=" + $username + "&objId=" + obj1.id + "\"><button type=\"button\" class=\"btn btn-danger btn-lg\">INVEST</button></a> </div></div>";
                    }
                    document.getElementById("mainbkp1").innerHTML = $strm;
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
                            $menu_ic = "<div> <a href=\"newmemberships.html?rtype=" + obj1.get("memTierName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" class=\" token-owner-logo\" align=\"right\"></a>  <a href=\"newmemberships.html?rtype=" + obj1.get("memTierName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" class=\" token-owner-logo\" align=\"right\"></a> </div>";
                        }
                        $strm += "<div class=\"token-card\"> <div></div>" + " <img src=\"" + obj1.get("memTierImage").url() + "\" class=\"token-img-top \"> <p></p> <div class=\"token-card-body \"> <h5 class=\"token-title \">" + obj1.get("memTierName") + "</h5> <P class=\"token-card-cost \"><b>$" + obj1.get("memTierCost") + " per month</b></P> <p class=\"token-card-text \"> " + obj1.get("memTierDesc") + "</p> <a href=\"membershipProduct.html?userId=" + $username + "&objId=" + obj1.id + "\"> <button type=\"button \" class=\"btn btn-danger btn-lg \">JOIN</button> </a> </div> </div>";
                    }
                    document.getElementById("mainbkp2").innerHTML = $strm;
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
                        $strm += "<div class=\"token-card \" \"> <div></div> " + "<img src=\"" + obj1.get("activityFile").url() + "\" class=\"token-img-top \" > <p></p> <div class=\"token-card-body \"> <h5 class=\"token-title \">" + obj1.get("activityName") + "</h5> <P class=\"token-card-cost \"><b>$" + obj1.get("activityCost") + " per month</b></P> <p class=\"token-card-text \"> " + obj1.get("activityDesc") + " </p> <a href=\"connectProduct.html?userId=" + $username + "&objId=" + obj1.id + "\"><button type=\"button \" class=\"btn btn-danger btn-lg \">JOIN</button></a> </div> </div>";
                        // alert(JSON.stringify());
                    }
                    document.getElementById("mainbkp4").innerHTML = $strm;
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
                            $menu_ic = "<div> <a href=\"newlicensing.html?rtype=" + obj1.get("licensingName") + "\"><img src=\"https://cdn.iconscout.com/icon/free/png-256/edit-2653317-2202989.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a>  <a href=\"newlicensing.html?rtype=" + obj1.get("licensingName") + "\"><img src=\"https://cdn.icon-icons.com/icons2/1744/PNG/512/3643772-archive-archives-document-folder-open_113445.png\" alt=\"\" class=\" token-owner-logo\" align=\"right\"></a> </div>";
                        }
                        // alert(JSON.stringify());
                        $strm += "<div class=\"token-card \" \"> <div></div>" + "<p></p> <img src=\"" + $img + "\" class=\"collectible-img-top \" alt=\"... \"> <p></p> <div class=\"token-card-body \"> <h5 class=\"collectible-title \">" + obj1.get("licensingName") + "</h5> <P class=\"collectible-card-cost \"><b>$" + obj1.get("licensingCost") + "</b></P> <a href=\"licensingProduct.html?userId=" + $username + "&objId=" + obj1.id + "\"> <button type=\"button \" class=\"btn btn-danger btn-lg \">BUY</button></a> </div></div>";
                    }
                    document.getElementById("mainbkp3").innerHTML = $strm;
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
    if (userId == null) {
        searchUser1();

    } else {

        const User = Moralis.Object.extend("User");
        const query = new Moralis.Query(User);
        query.equalTo("username", userId + "");
        query.find()
            .then(function (results) {
                // alert(JSON.stringify(results));
                try {
                    $user1 = results[0];
                    // alert(JSON.stringify($user1));

                    searchUser1();
                } catch ($e) {
                    alert($e + "1");
                }
            })
            .catch(function (error) {
                alert(JSON.stringify(error));
            });

    }
}
// } catch ($e) {
//     alert($e + "");
// }
async function logoutNow() {

    await Moralis.User.logOut();
    window.location.assign("../index.html");
}