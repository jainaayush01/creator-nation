Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
const User = Moralis.Object.extend('_User')
const query = new Moralis.Query(User)
query.equalTo("username", sessionStorage.getItem("search_data"));

query.find()
    .then((results) => {
        try {
            $strm = "";
            for (let i = 0; i < results.length; i++) {

                // const obj1 = result[i]
                // console.log(obj1)

                // console.log(results[i]);
                const obj1 = results[i];
                if(obj1.get("profile_dp")) {
                    $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\"card\" style=\"text-align: center;\"><img src=\""+obj1.get('profile_dp')._url+"\" class=\"img-fluid img-thumbnail rounded\" ><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

                }else {
                $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\"card\" id=\"individualcard\" style=\"text-align: center;\"><img src=\""+'https://avatars.dicebear.com/api/miniavs/user.svg?mood[]=happy'+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

                // }
            }
            document.getElementById("search_results").innerHTML = $strm;
        } catch ($e) {
            console.log($e + "bkp");
        }

        // try {
        //     console.log(result)

            // for (var i = 0; i < result.length; i++) {
            //     const obj1 = result[i]
            //     const userProfileImageSlug = user.id.substring(4, 8);
            //     const profile = document.querySelector('.cnProfile');
            //     const profileImgElement = document.querySelector('.cn-profile-image');
            //     const profileCoverImgElement = document.querySelector('.cn-cover-image');
            //     const profileUserName = document.querySelector(".profileName")
            //     const profileUserBio = document.querySelector(".profileBio")
            //     console.log(obj1)

        //         if(!obj1.get('userProfileCoverPicture')) {
        //             profile.innerHTML = '<img class="cn-cover-image" src='+'"https://i.ytimg.com/vi/uFk0mgljtns/maxresdefault.jpg" ' +
        //             '/>' + '<img class="cn-profile-image" src='+'"https://avatars.dicebear.com/api/miniavs/user.svg?mood[]=happy" '+
        //             'width="136px" height="136px" />' + "<h1 class='profileName' style='text-align: center'>"+userId+"</h1>" + "<p class='profileBio' style='text-align: center'>Sample Bio</p>"
        //         }
        //             profileImgElement.setAttribute("src", obj1.get("userProfilePicture")._url || "https://avatars.dicebear.com/api/miniavs/"+userProfileImageSlug+".svg?mood[]=happy");
        //             profileCoverImgElement.setAttribute("src", obj1.get("userProfileCoverPicture")._url || "https://i.ytimg.com/vi/uFk0mgljtns/maxresdefault.jpg");

                
        //         profileUserName.innerText = userId;
        //         profileUserBio.innerText = obj1.get("bio")
        //     }
        // } catch (err) {
        //     console.log(err);
        // }
    })

// const User = Moralis.Object.extend("User");
// const query = new Moralis.Query(User);
// query.equalTo("username", sessionStorage.getItem("search_data"));
// // query.fullText('username', $str + "");
// // query.equalTo("email", $str);
// query.find()
//     .then(function(results) {
//         // alert(JSON.stringify(results));
//         console.log(results)

        // try {
        //     $strm = "";
        //     for (let i = 0; i < results.length; i++) {
        //         const obj1 = results[i];
        //         if(obj1.get("userProfilePicture")) {
        //             $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\" card \" id=\" individualcard \" style=\"text-align: center;\"><img src=\""+obj1.get('userProfilePicture')._url+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

        //         }else {
        //         $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\" card \" id=\" individualcard \" style=\"text-align: center;\"><img src=\""+'https://avatars.dicebear.com/api/miniavs/user.svg?mood[]=happy'+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

        //         }
        //     }
        //     document.getElementById("search_results").innerHTML = $strm;
        // } catch ($e) {
        //     console.log($e + "bkp");
        // }
//     })
//     .catch(function(error) {
//         alert(JSON.stringify(error));
//     });
