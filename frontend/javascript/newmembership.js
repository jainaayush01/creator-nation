Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";

async function logoutNow() {
    await Moralis.User.logOut();
    window.location.assign("../index.html");
}
const urlParams = new URLSearchParams(window.location.search);
const rtype = urlParams.get('rtype');
if (rtype != null) {

    const User = Moralis.Object.extend("Memberships");
    const query = new Moralis.Query(User);
    query.equalTo("memTierName", rtype);
    // query.fullText('username', $str + "");
    // query.equalTo("email", $str);
    query.find()
        .then(function (results) {
            // alert(JSON.stringify(results));

            try {
                if (results != null && results.length > 0) {
                    const obj1 = results[0];
                    document.getElementById("tierName").value = obj1.get("memTierName");
                    document.getElementById("tierPrice").value = obj1.get("memTierCost");
                    quill.root.innerHTML = obj1.get("memTierDesc");
                    document.getElementById("memTierLimitMain").value = obj1.get("memTierLimit");
                    document.getElementById("memtierLimitNum").value = obj1.get("memTierLimitNum");
                    document.getElementById("tokenID").value = obj1.get("memTierName");
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
    const NewMemb = Moralis.Object.extend("Memberships");
    const membership = new NewMemb();
    var memDescQuill = quill.root.innerHTML.trim();
    $tokenId = document.getElementById("tokenID");

    membership.set('memTierName', document.getElementById("tierName").value);
    membership.set('memTierCost', document.getElementById("tierPrice").value);
    membership.set('memTierDesc', memDescQuill);
    membership.set('memTierLimit', document.getElementById("memTierLimitMain").value);
    membership.set('memTierLimitNum', document.getElementById("memtierLimitNum").value);
    membership.set('username', Moralis.User.current());

    const fileUploadControl = $("#tierImage")[0];
    if (fileUploadControl.files.length > 0) {
        const file = fileUploadControl.files[0];
        const name = "memFormPic.jpg";

        const membershipPic = new Moralis.File(name, file);
        membership.set('memTierImage', membershipPic);
        if (file.size > 2097152) // 2 MB in bytes.
        {
            alert("File size must be under 2MB.");
            return;
        }
    }

    for (const el of document.getElementById('membershipForm').querySelectorAll("[required]")) {
        if (!el.reportValidity()) {
            return;
        }
    }

    await membership.save();
    window.location.assign("../index.html");

}