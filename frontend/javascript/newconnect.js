Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";

async function logoutNow() {
    await Moralis.User.logOut();
    window.location.assign("../index.html");
}
const urlParams = new URLSearchParams(window.location.search);
const rtype = urlParams.get('rtype');
if (rtype != null) {

    const User = Moralis.Object.extend("Connect");
    const query = new Moralis.Query(User);
    query.equalTo("activityName", rtype);
    // query.fullText('username', $str + "");
    // query.equalTo("email", $str);
    query.find()
        .then(function(results) {
            // alert(JSON.stringify(results));

            try {
                if (results != null && results.length > 0) {
                    const obj1 = results[0];
                    document.getElementById("activityName").value = obj1.get("activityName");
                    document.getElementById("activityCost").value = obj1.get("activityCost");
                    quill1.root.innerHTML = obj1.get("activityDate");
                    quill2.root.innerHTML = obj1.get("activityDesc");
                    document.getElementById("activityLink").value = obj1.get("activityLink");
                    document.getElementById("activityLimitMain").value = obj1.get("activityLimit");
                    document.getElementById("activityLimitNum").value = obj1.get("activityLimitNum");
                    document.getElementById("tokenID").value = obj1.get("activityName");
                    document.getElementById("connectButton").value = "Update";

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
    const NewConnect = Moralis.Object.extend("Connect");
    const connect = new NewConnect();
    var connectDateQuill = quill1.root.innerHTML.trim();
    var connectDescQuill = quill2.root.innerHTML.trim();
    $tokenId = document.getElementById("tokenID");

    connect.set('activityName', document.getElementById("activityName").value);
    connect.set('activityDate', connectDateQuill);
    connect.set('activityCost', document.getElementById("activityCost").value);
    connect.set('activityDesc', connectDescQuill);
    connect.set('activityLink', document.getElementById("activityLink").value);
    connect.set('activityLimit', document.getElementById("activityLimitMain").value);
    connect.set('activityLimitNum', document.getElementById("activityLimitNum").value);
    connect.set('username', Moralis.User.current());

    const fileUploadControl = $("#activityFile")[0];
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = "connectFormPic.jpg";

        const connectPic = new Moralis.File(name, file);
        connect.set('activityFile', connectPic);
        if (file.size > 2097152) // 2 MB in bytes.
        {
            alert("File size must be under 2MB.");
            return;
        }
    }

    for (const el of document.getElementById('connectForm').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            return;
        }
    }

    await connect.save();
    window.location.assign("../index.html");

}