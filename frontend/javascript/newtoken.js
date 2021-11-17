Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";

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
        .then(function(results) {
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
        .catch(function(error) {
            alert(JSON.stringify(error));
        });
}
async function createNow() {
    const NewToken = Moralis.Object.extend("CreatorToken");
    const token = new NewToken();
    var tokenQuill = quill.root.innerHTML.trim();

    $tokenId = document.getElementById("tokenID");

    token.set('tokenName', document.getElementById("tokenName").value);
    token.set('tokenPrice', document.getElementById("tokenPrice").value);
    token.set('tokenBenefits', tokenQuill);
    token.set('tokenSupplyLimit', document.getElementById("tokenSupplyLimit").value);
    token.set('tokenRoyalties', document.getElementById("tokenRoyalties").value);
    token.set('username', Moralis.User.current());

    const fileUploadControl = $("#tokenFile")[0];
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = "tokenFormPic.jpg";

        const tokenPic = new Moralis.File(name, file);
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

    await token.save();
    window.location.assign("../index.html");

}