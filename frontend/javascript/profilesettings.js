Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
var url = window.location.href;
const urlParams = new URLSearchParams(window.location.search);

// const UserProfile = Moralis.Object.extend("User");
// const userProfile = new UserProfile(user.id);
// userProfile.set('bio','hellooooSample')

// console.log(user)
// query.equalTo("objectId",user.id)
console.log(user.id)

let testProfile;

getUsers = async () => {
const query = new Moralis.Query("_User");
query.equalTo("objectId",user.id)
const users = await query.find()
testProfile = users
console.log(users)
}


// query.find()
// .then((result) => {
//     try {
//         for (let i = 0; i < result.length; i++) {
//             const obj1 = result[i];
//             console.log(obj1)
            
//             // $strm += "<div class=\" card_col_homepage \"><a href=\"profile.html?userId=" + obj1.get("username") + "\"> <div class=\" card \" id=\" individualcard \" style=\"text-align: center;\"><img src=\""+obj1.get('userProfilePicture')._url+"\" style=\"height:100px; width:100px; margin-left:80px;\"><br><h3>" + obj1.get('username') + "</h3></div></a></div>";
//         }
//     }catch(err) {
//         console.log(err)
//     }
// })

const setProfileSettings = async () => {
    getUsers()

    const User = Moralis.Object.extend("_User");
    const userInstance = new User();
    
    userInstance.set("username",'testSampleName')
    await userInstance.save();
     console.log(userInstance);

}

// setProfileSettings(testProfile)


const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const creatorNationUrl = document.querySelector("#CN-url");
const profileDP = document.querySelector("#profileDP");
const profileCover = document.querySelector("#profileCover");
const profileDesc = document.querySelector(".ql-editor p");
const profileExt = document.querySelector("#profileExt");
var profileSubmitBtn = document.querySelector("#formGroupSubmit")


if(user) {
    console.log(profileName.value, profileEmail.value, creatorNationUrl.value, profileDP.value, profileCover.value, profileDesc.innerText.length, profileExt.value)
    // if(profileName.value === "" && profileEmail.value === "" && profileDP.value === "" && profileCover.value === "") {
// query.equalTo("username", !profileName.value)
//         const item = await query.first();
//         if(item) {
//             item.set("username",profileName.value)
//             await item.save()
//         }
        profileSubmitBtn.addEventListener("click", (e) => {
            user.set("username",profileName.value)
            user.set("email", profileEmail.value);
            
    console.log(profileName.value, profileEmail.value, creatorNationUrl.value, profileDP.value, profileCover.value, profileDesc.innerText.length, profileExt.value)

            e.preventDefault()
        })
    // }
    
}




