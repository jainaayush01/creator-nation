const User = Moralis.Object.extend("User");
const query = new Moralis.Query(User);
query.equalTo("username", sessionStorage.getItem("search_data"));
// query.fullText('username', $str + "");
// query.equalTo("email", $str);
query.find()
    .then(function(results) {
        // alert(JSON.stringify(results));
        console.log(results)

        try {
            $strm = "";
            for (let i = 0; i < results.length; i++) {
                const obj1 = results[i];
                if(obj1.get("userProfilePicture")) {
                    $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\" card \" id=\" individualcard \" style=\"text-align: center;\"><img src=\""+obj1.get('userProfilePicture')._url+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

                }else {
                $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\" card \" id=\" individualcard \" style=\"text-align: center;\"><img src=\""+'https://avatars.dicebear.com/api/miniavs/user.svg?mood[]=happy'+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";

                }
            }
            document.getElementById("search_results").innerHTML = $strm;
        } catch ($e) {
            console.log($e + "bkp");
        }
    })
    .catch(function(error) {
        alert(JSON.stringify(error));
    });