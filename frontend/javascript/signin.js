Moralis.initialize("o7HX0V4MSHEZ1kV4p8Cc1c1v4AZdBoFh3tbL2rq3"); // APP ID
Moralis.serverURL = "https://whr4yd3prbrn.usemoralis.com:2053/server";

const appHeaderContainer = document.getElementById("app-header-btns");
const contentContainer = document.getElementById("content");

async function logOut() {
    await Moralis.User.logOut();
    render();
    console.log("logged out. User:", Moralis.User.current());
}

async function loginWithMetaMask() {
    let user = Moralis.User.current();
    if (!user) {
        try {
            user = await Moralis.authenticate({ signingMessage: "Creator Nation Authentication" })
            console.log(user)
            console.log(user.get('ethAddress'))
        } catch (error) {
            console.log(error)
        }
    }

    render();
}


async function loginWithEmail(isSignUp) {
    $username = "",
        $emailID = "",
        $pass = "";
    if (isSignUp) {
        $username = document.getElementById("signupUsername1").value;
        $emailID = document.getElementById("signupemail1").value;
        $pass = document.getElementById("signuppass1").value;
    } else {
        $username = document.getElementById("username").value;
        $pass = document.getElementById("pass").value;
    }
    if (isSignUp) {
        if (!$username || !$pass || !$emailID) {
            alert("please provide email, username and password");
            return;
        }
    } else {
        if (!$username || !$pass) {
            alert("please provide both username and password");
            return;
        }
    }
    try {
        if (isSignUp) {
            // when using email for username
            // assign it to the username property
            const user = new Moralis.User();
            user.set("username", $username);
            user.set("email", $emailID);
            user.set("password", $pass);
            await user.signUp();
        } else {
            await Moralis.User.logIn($username, $pass);
        }

        render();
    } catch (error) {
        console.log(error);
        alert("invalid username or password");
    }
}

function listenForAccountChange() {
    Moralis.Web3.onAccountsChanged(async function (accounts) {
        console.log("account changed:", accounts);
        const user = Moralis.User.current();
        if (!user || !accounts.length) {
            // not logged in
            return;
        }

        try {
            const address = accounts[0];
            if (addressAlreadyLinked(user, address)) {
                console.log(`address ${getAddressTxt(address)} already linked`);
                return;
            }

            const confirmed = confirm("Link this address to your account?");
            if (confirmed) {
                await Moralis.Web3.link(address);
                alert("Address added!");
                render();
            }
        } catch (error) {
            if (error.message.includes("already used")) {
                alert("That address is already linked to another profile!");
            } else {
                console.error(error);
                alert("Error while linking. See the console.");
            }
        }
    });
}

function addressAlreadyLinked(user, address) {
    return (
        user &&
        address &&
        user.attributes.accounts &&
        user.attributes.accounts.includes(address)
    );
}

async function onUnlinkAddress(event) {
    event.preventDefault();
    try {
        const address = event.target.dataset.addr;
        console.log("onUnlinkAddress:: addr:", address);

        const confirmed = confirm("Are you sure you want to remove this address?");
        if (!confirmed) {
            return;
        }

        await Moralis.Web3.unlink(address);
        alert("Address removed from profile!");
        render();
    } catch (error) {
        console.error(error);
        alert("Error unlinking address. See console.");
    }
}

function renderHeader() {
    const user = Moralis.User.current();
    if (!user) {
        return;
    }
    // show the logout, refresh buttons if user logged in
    appHeaderContainer.innerHTML = `
      <button id="btn-logout"></button>
    `;
    document.getElementById("btn-logout").onclick = logOut;
}

function buildLoginComponent(isSignUp = false) {
    // const btnSignUp = isSignUp
    //   ? ""
    //   : `<button type="button" id="btn-login-username-signup">Sign Up With Email</button>`;

    return `
    <div class="container-login">
    <form class="form" id="loginAccount">
      <h1 class="form__title">Sign In</h1>
      <div class="form__message form__message--error"></div>
      <div id="frm-login">
        <div class="form__input-group">
        <input type="text" id="username" name="username" class="form__input" autofocus placeholder="Username"/>
        <div class="form__input-error-message"></div>
        </div>
       
        <div class="form__input-group">
          <input type="password" id="pass" name="pass" class="form__input" autofocus placeholder="Password"/>
        </div>
        <button type="button" id="btn-login-username" class="form__button">Submit</button>
      
      </div>
            <p class="form__text">
                <a class="form__link" href="./" id="linkForgotPassword">Forgot your password?</a>
            </p>
            <p class="form__text">
                <a class="form__link" href="./" id="linkCreateAccount">Don't have an account? Create account</a>
            </p>
      </form>

      <form class="form form--hidden" id="createAccount">
            <h1 class="form__title">Create Account</h1>
            <div class="form__message form__message--error"></div>
            <div class="form__input-group">
                <input type="text" id="signupUsername1" class="form__input" autofocus placeholder="Username">
                <div class="form__input-error-message"></div>
            </div>
            <div class="form__input-group">
                <input type="email" class="form__input" id="signupemail1" autofocus placeholder="Email Address">
                <div class="form__input-error-message"></div>
            </div>
            <div class="form__input-group">
                <input type="password" class="form__input"  id="signuppass1" autofocus placeholder="Password">
                <div class="form__input-error-message"></div>
            </div>
            <button class="form__button" type="button" id="btn-login-username-signup">Sign Up</button>
            <p class="form__text">
                <a class="form__link" href="./" id="linkLogin">Already have an account? Sign in</a>
            </p>
        </form>

        <form class="form form--hidden" id="forgotPassword">
            <h1 class="form__title">Create Account</h1>
            <div class="form__message form__message--error"></div>
            
            <div class="form__input-group">
                <input type="email" class="form__input" autofocus placeholder="Email Address">
                <div class="form__input-error-message"></div>
            </div>
            <button class="form__button" type="button">Email Password Reset Link</button>
            <p class="form__text">
                <a class="form__link" href="" id="linkLogin">Already have an account? Sign in</a>
            </p>
        </form>
      <hr/>
            <p class="form__text">
                <a href="#" class="form__link">OR</a>
            </p>
      <button class="form__button" id="btn-login-metamask">Login with MetaMask(Crypto)</button>
      </div>
  `;
}

function renderLogin(isSignUp) {
    contentContainer.innerHTML = buildLoginComponent(isSignUp);
    document.getElementById("btn-login-metamask").onclick = loginWithMetaMask;
    document.getElementById("btn-login-username").onclick = function () {
        loginWithEmail(isSignUp);
    };
    if (!isSignUp) {
        document.getElementById("btn-login-username-signup").onclick = function () {
            loginWithEmail(true);
        };
    }
}

function getAddressTxt(address) {
    return `${address.substr(0, 4)}...${address.substr(
        address.length - 4,
        address.length
    )}`;
}

function buildProfileComponent(user) {
    return `
    <div class="container">
      <div>
        <div class="form-group">
          <label for="name">Username</label>
          <input type="text" id="name" value="${user.attributes.username || ""
        }"/>
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            cols="50"
            maxlength="200" >${user.attributes.bio || ""}</textarea>
        </div>
        <div id="profile-set-pass">
          ${buildSetPassComponent()}
        </div>
        ${buildAddrListComponent(user)}
        <button class="mt" type="button" id="btn-profile-save">Save Profile</button>
      </div>
    </div>
  `;
}

function buildAddrListComponent(user) {
    // add each address to the list
    let addressItems = "";
    if (user.attributes.accounts && user.attributes.accounts.length) {
        addressItems = user.attributes.accounts
            .map(function (account) {
                return `<li>
          <button class="btn-addr btn-remove" type="button" data-addr="${account}">X</button>
          ${getAddressTxt(account)}
        </li>`;
            })
            .join("");
    } else {
        // no linked addreses, add button to link new address
        addressItems = `
    <li>
      <button class="btn-addr" type="button" id="btn-add-addr">+</button>
      Link
    </li>
    `;
    }

    return `
    <div>
      <h3>Linked Addresses</h3>
      <ul>
        ${addressItems}
      </ul>
    </div>
  `;
}

function renderProfile(user) {
    contentContainer.innerHTML = buildProfileComponent(user);
    document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
    document.getElementById("btn-profile-save").onclick = onSaveProfile;
    document.querySelectorAll(".btn-remove").forEach(function (button) {
        button.onclick = onUnlinkAddress;
    });

    const btnAddAddress = document.getElementById("btn-add-addr");
    if (btnAddAddress) {
        btnAddAddress.onclick = onAddAddress;
    }
}

function onSetPassword(event) {
    const containerSetPass = document.getElementById("profile-set-pass");
    containerSetPass.innerHTML = buildSetPassComponent(true);
    document.getElementById("btn-save-pass").onclick = onSaveNewPassword;
    document.getElementById("btn-cancel-pass").onclick = onCancelNewPassword;
}

function buildSetPassComponent(showForm = false) {
    if (!showForm) {
        return `
      <p>Setting a password allows login via username</p>
      <button type="button" id="btn-profile-set-pass">Set Password</button>
    `;
    }

    return `
    <div class="set-password">
      <div class="form-group">
        <label for="pass">New Password</label>
        <input type="password" id="pass" autocomplete="off" />
      </div>
      <div class="form-group">
        <label for="confirm-pass">Confirm</label>
        <input type="password" id="confirm-pass" autocomplete="off" />
      </div>
      <button type="button" id="btn-save-pass">Save Password</button>
      <button type="button" id="btn-cancel-pass">Cancel</button>
    </div>
  `;
}

async function onSaveNewPassword(event) {
    event.preventDefault();
    const user = Moralis.User.current();

    try {
        // make sure new and confirmed password the same
        const newPass = document.getElementById("pass").value;
        const confirmPass = document.getElementById("confirm-pass").value;

        if (newPass !== confirmPass) {
            alert("passwords not equal");
            return;
        }

        user.setPassword(newPass);
        await user.save();
        alert("Password updated successfully!");

        render();
    } catch (error) {
        console.error(error);
        alert("Error while saving new password. See the console");
    }
}

function onCancelNewPassword() {
    const containerSetPass = document.getElementById("profile-set-pass");
    containerSetPass.innerHTML = buildSetPassComponent();
    document.getElementById("btn-profile-set-pass").onclick = onSetPassword;
}

async function onAddAddress() {
    try {
        // enabling web3 will cause an account changed event
        // which is already subscribed to link on change so
        // just connecting Metamask will do what we want
        // (as long as the account is not currently connected)
        await Moralis.Web3.enable();
    } catch (error) {
        console.error(error);
        alert("Error while linking new address. See console");
    }
}

async function onSaveProfile(event) {
    event.preventDefault();
    const user = Moralis.User.current();

    try {
        // get values from the form
        const username = document.getElementById("name").value;
        const bio = document.getElementById("bio").value;
        console.log("username:", username, "bio:", bio);

        // update user object
        user.setUsername(username); // built in
        user.set("bio", bio); // custom attribute

        await user.save();
        alert("saved successfully!");
    } catch (error) {
        console.error(error);
        alert("Error while saving. See the console.");
    }
}

function render() {
    const user = Moralis.User.current();
    renderHeader();
    if (user) {
        // renderProfile(user);
        window.location.assign("../index.html");

    } else {
        renderLogin();
    }
}

function init() {
    listenForAccountChange();

    // render on page load
    render();
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginAccount");
    const createAccountForm = document.querySelector("#createAccount");
    const forgotPasswordForm = document.querySelector("#forgotPassword");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.add("form--hidden");
    });

    document.querySelector("#linkForgotPassword").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        forgotPasswordForm.classList.remove("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
init();