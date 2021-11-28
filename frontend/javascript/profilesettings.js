Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
var url = window.location.href;
const urlParams = new URLSearchParams(window.location.search);

// const UserProfile = Moralis.Object.extend("User");
// const userProfile = new UserProfile(user.id);
// userProfile.set('bio','hellooooSample')

// console.log(user)
// query.equalTo("objectId",user.id)
// console.log(user.id)
// console.log(Moralis.User.current())

const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const creatorNationUrl = document.querySelector("#CN-url");
const profileDP = document.querySelector("#profileDP");
const profileCover = document.querySelector("#profileCover");
const profileDesc = document.querySelector(".ql-editor p");
const profileExt = document.querySelector("#profileExt");
var profileSubmitBtn = document.querySelector("#formGroupSubmit")

let testProfile;
getUser = async () => {
    const userData = Moralis.Object.extend("_User");
    const query = new Moralis.Query(userData);
    // const query = new Moralis.Query("_User");
    // query.equalTo("objectId",user.id);
    // const users = await query.find();
    // ("Successfully retrieved " + users.length + " users.");
    // testProfile = users;
    // console.log("++++++++++ ", users[0]);
    query.get(user.id)
        .then((user) => {
            // console.log("++++++++++++++++++++++++++++++++++++++ ", user.get('profile_dp'))
            // console.log("++++++++++++++++++++++++++++++++++++++ ", user.get('profile_desc'))
            // console.log(quill)
            testProfile = user;
            profileName.value = user.get('username');
            profileEmail.value = user.get('email');
            creatorNationUrl.value = user.get('cn_url');
            // profileDP.value = user.get('profile_dp')._name;
            // profileCover.value = user.get('profile_cover')._name;
            if(user.get('profile_desc'))
            quill.setText(user.get('profile_desc'));
            profileExt.value = user.get('profile_ext');
        })
}

getUser();
// saveUser = async () => {
//     console.log($(profileName).val());
// }

// setFormValues = async (user) => {
//     console.log($(profileName).val());
// }

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
    console.log("user instance ", userInstance);

}

// setProfileSettings(testProfile)


if(user) {
    // console.log(profileName.value, profileEmail.value, creatorNationUrl.value, 
    //     profileDP.value, profileCover.value, profileDesc.innerText.length, 
    //     profileExt.value)
    // if(profileName.value === "" && profileEmail.value === "" && profileDP.value === "" && profileCover.value === "") {
// query.equalTo("username", !profileName.value)
//         const item = await query.first();
//         if(item) {
//             item.set("username",profileName.value)
//             await item.save()
//         }
        profileSubmitBtn.addEventListener("click", (e) => {
            user.set("username",profileName.value);
            user.set("email", profileEmail.value);
            user.set("cn_url", creatorNationUrl.value);
            if(profileDP.files.length)
            user.set("profile_dp", new Moralis.File("avatar.jpg", profileDP.files[0]));
            if(profileCover.files.length)
            user.set("profile_cover", new Moralis.File('cover.jpg', profileCover.files[0]));
            user.set("profile_desc", quill.getText());
            user.set("profile_ext", profileExt.value);
            
            user.save()
                .then((user) => {
                    console.log("UPDATED SUCCESSFULLY.");
                }, (error) => {
                    console.log("ERROR UPDATING DUE TO ", error);
                })
            // console.log(profileName.value, profileEmail.value, 
            //     creatorNationUrl.value, profileDP.value, profileCover.value, 
            //     profileDesc.innerText.length, profileExt.value)

            e.preventDefault()
        })
    // }
    
}




