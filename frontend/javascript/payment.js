const BACKEND_URL = 'https://34.70.138.124';
// const BACKEND_URL = 'http://localhost:8080'
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51JbPGjSDIAUQ0zT7QrDZqVpznfVEDLAxQc0iM2lLdXpJ1bZMsdGkkNFW9sOpbeWuKNBqIYVERhc6zEoZDDfTuQUu00nUonCHip';

// utils
// Helper for displaying status messages.
const addMessage = (message) => {
    const messagesDiv = document.querySelector('#messages');
    messagesDiv.style.display = 'block';
    const messageWithLinks = addDashboardLinks(message);
    messagesDiv.innerHTML = `> ${messageWithLinks}<br>`;
    console.log(`Debug: ${message}`);
};

// Adds links for known Stripe objects to the Stripe dashboard.
const addDashboardLinks = (message) => {
    const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
    return message.replace(
        /(pi_(\S*)\b)/g,
        `<a href="${piDashboardBase}/$1" target="_blank">$1</a>`
    );
};


document.addEventListener('DOMContentLoaded', async () => {
    const publishableKey = STRIPE_PUBLISHABLE_KEY;

    const stripe = Stripe(publishableKey, {
        apiVersion: '2020-08-27',
    });

    const elements = stripe.elements();
    console.log(elements);
    const card = elements.create('card');
    card.mount('#card-element');

    const form = document.getElementById('payment-form');
    let submitted = false;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (submitted) { return; }
        submitted = true;
        form.querySelector('#submit').disabled = true;
        const currentBid = document.querySelector('#payment-modal-token-price').value;
        const userEthAddress = localStorage.getItem('userEthAddress');
        const tokenId = parseInt(localStorage.getItem('tokenId'));
        let productType = getProductType();

        console.log(currentBid);
        console.log(userEthAddress);
        console.log(tokenId);

        const { error: backendError, clientSecret } = await fetch(
            `${BACKEND_URL}/create-payment-intent`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currency: 'inr',
                    amount: currentBid*100*80,
                    paymentMethodType: 'card',
                    userEthAddress: userEthAddress,
                    tokenId: tokenId,
                    tokenNos: 1,
                    productType: productType
                }),
            }
        ).then((r) => r.json());

        if (backendError) {
            addMessage(backendError.message);

            submitted = false;
            form.querySelector('button').disabled = false;
            return;
        }

        const nameInput = document.querySelector('#name');

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: nameInput.value,
                    },
                },
            }
        );

        if (stripeError) {
            addMessage(stripeError.message);

            // reenable the form.
            submitted = false;
            form.querySelector('#submit').disabled = false;
            return;
        }

        addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    });
    function getProductType() {
        if (window.location.pathname.includes('product')) {
            return 1;
        }
        else if (window.location.pathname.includes('membershipProduct')) {
            return 0;
        }
        else if (window.location.pathname.includes('licensingProduct')) {
            return 1;
        }
        else if (window.location.pathname.includes('connectProduct')) {
            return 0;
        }
    }
});
