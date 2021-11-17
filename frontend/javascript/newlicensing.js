Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";

async function logoutNow() {
    await Moralis.User.logOut();
    window.location.assign("../index.html");
}
const urlParams = new URLSearchParams(window.location.search);
const rtype = urlParams.get('rtype');
if (rtype != null) {

    const User = Moralis.Object.extend("CollLicensing");
    const query = new Moralis.Query(User);
    query.equalTo("licensingName", rtype);
    // query.fullText('username', $str + "");
    // query.equalTo("email", $str);
    query.find()
        .then(function(results) {
            // alert(JSON.stringify(results));

            try {
                if (results != null && results.length > 0) {
                    const obj1 = results[0];
                    document.getElementById("licensingName").value = obj1.get("licensingName");
                    document.getElementById("licensingCost").value = obj1.get("licensingCost");
                    document.getElementById("licensingType").value = obj1.get("licensingType");
                    quill1.root.innerHTML = obj1.get("licensingAgreement");
                    quill2.root.innerHTML = obj1.get("licensingDescription");
                    document.getElementById("licensingButton").value = "Update";

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
    const NewLicensing = Moralis.Object.extend("CollLicensing");
    const licensing = new NewLicensing();
    var licensingAgreeQuill = quill1.root.innerHTML.trim();
    var licensingDescQuill = quill2.root.innerHTML.trim();
    $tokenId = document.getElementById("tokenID");

    licensing.set('licensingName', document.getElementById("licensingName").value);
    licensing.set('licensingCost', document.getElementById("licensingCost").value);
    licensing.set('licensingType', document.getElementById("licensingType").value);
    licensing.set('licensingAgreement', licensingAgreeQuill);
    licensing.set('licensingDescription', licensingDescQuill);
    licensing.set('username', Moralis.User.current());

    const fileUploadControl = $("#licensingFile")[0];
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = "licensingFormPic.jpg";

        const connectPic = new Moralis.File(name, file);
        licensing.set('licensingFile', connectPic);
        if (file.size > 2097152) // 2 MB in bytes.
        {
            alert("File size must be under 2MB.");
            return;
        }
    }

    for (const el of document.getElementById('licensingForm').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            return;
        }
    }

    await licensing.save();
    window.location.assign("../index.html");

}