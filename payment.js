

document.addEventListener("DOMContentLoaded", function () {
    const stripe = Stripe('pk_test_51PROqvP3Yf1fstYulnAre10FJOEda9nZ78RMa1G0RjfLxrJWXI3AaD2UJlN5GuZ102Qh51OnFaBW8VixY5PVYq7Q00Gac8x1Ua'); // Ustaw swój publiczny klucz Stripe
    const elements = stripe.elements();
 
    const style = {
        base: {
            fontSize: '16px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        }
    };

    const cardElement = elements.create('card', { style });
    cardElement.mount('#card-element');

    cardElement.on('change', function(event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    const paymentButton = document.getElementById('submit-payment-btn');
    paymentButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
        } else {
            const response = await fetch('/api/stripe/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tokenId: token.id,
                    amount: 1000  
                })
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Błąd płatności:', errorResponse.error);
                alert('Wystąpił problem podczas przetwarzania płatności. Spróbuj ponownie później.');
            } else {
                const paymentResult = await response.json();
                console.log('Pomyślna płatność:', paymentResult);
                alert('Płatność została pomyślnie przetworzona.');
                window.location.href = '/thankyou.html';  
            }
        }
    });
});
