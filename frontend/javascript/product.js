Moralis.initialize("rDecx1uN0CRZ8QWRxqjDeWEdc9P9ozhtp5xJjH5v"); // APP ID
Moralis.serverURL = "https://onln8a9c8sry.bigmoralis.com:2053/server";
var url = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlParams.entries());

async function checkWallet() {

    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("metamask not installed")
            document.querySelector('.buyCrypto').classList.add('hideBtn');
            document.querySelector('.buyFiat').classList.remove('hideBtn');
        } else {
            console.log("eth obj is --> ", ethereum);
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorised account!', account);
                document.querySelector('.buyCrypto').classList.remove('hideBtn');
                document.querySelector('.buyFiat').classList.add('hideBtn');

            } else {
                document.querySelector('.buyCrypto').classList.add('hideBtn');
                document.querySelector('.buyFiat').classList.remove('hideBtn');
                console.log('no authorised account found....');
            }
        }
    } catch (err) {
        console.log(err);
    }


}



async function connectWallet() {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log('please install metamask');
            document.querySelector('.buyCrypto').classList.add('hideBtn');
            document.querySelector('.buyFiat').classList.remove('hideBtn');
        } else {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });



            // console.log("Connected", accounts[0]);
        }
    } catch (err) {
        console.log(err);
    }
}


checkWallet();
connectWallet();

const CreatorToken = Moralis.Object.extend('CreatorToken');
const query = new Moralis.Query(CreatorToken);
query.get(params.objId)
    .then((queryResult) => {
        const productName = document.querySelector('.productName')
        const currentBid = document.querySelector('.currentBid')
        const description = document.querySelector('.description')
        const creatorName = document.querySelector('.creatorName')
        const productImageDisplay = document.querySelector('.productImageDisplay')
        productName.innerText = queryResult.get('tokenName');
        currentBid.innerText = '$' + queryResult.get('tokenPrice');
        description.innerText = queryResult.get('tokenBenefits');
        creatorName.innerText = params.userId
        productImageDisplay.setAttribute('src', queryResult.get('tokenFile')._url)
    })
    .catch(err => {
        console.log(err)
    });



let paymentModal = document.querySelector("#payment-modal");
let buyStripe = document.querySelector("#buyStripe");
let close = document.querySelector(".close");

buyStripe.onclick = () => {
    paymentModal.style.display = "block";
}

close.onclick = () => {
    paymentModal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == paymentModal) {
        paymentModal.style.display = "none";
    }
}