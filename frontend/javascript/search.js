Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";

async function logoutNow() {
    await Moralis.User.logOut();
    window.location.assign("../index.html");
}

async function searchUser() {
    try {
        $str = document.getElementById("searchbar").value;
        if ($str.length > 0) {
            window.sessionStorage.setItem("search_data", $str);
            window.location.assign("profile.html?userId="+$str);
        } else {
            alert("Please Enter Value for search");
        }
    } catch ($e) {
        console.log($e);
    }


}