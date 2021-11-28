Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";

async function logoutNow() {
    await Moralis.User.logOut();
    window.location.assign("../index.html");
}

async function searchUser() {
    try {
        $str = document.getElementById("searchbar").value;
        if ($str.length > 0) {
            window.sessionStorage.setItem("search_data", $str);
            window.location.assign("profile.html?userId=" + $str);
        } else {
            alert("Please Enter Value for search");
        }
    } catch ($e) {
        console.log($e);
    }


}