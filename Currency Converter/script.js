document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');
    const resultDiv = document.getElementById('result');
    const selectFrom = document.getElementById('from-currency')
        const selectTo= document.getElementById('to-currency')



//To add all country codes
for (let countryCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = countryCode;
    newoption.value = countryCode;
    selectFrom.append(newoption);
}

for (let countryCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = countryCode;
    newoption.value = countryCode;
    selectTo.append(newoption);
}

    // Function to fetch exchange rate
    async function getExchangeRate(from, to) {
        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
            return null;
        }
    }

    // Convert function
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        const from = fromCurrency.value;
        const to = toCurrency.value;
        const rate = await getExchangeRate(from, to);

        if (rate) {
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
            resultDiv.textContent = 'Error fetching exchange rate. Please try again.';
        }
    }

    // Swap currencies
    function swapCurrencies() {
        const temp = fromCurrency.value;
        fromCurrency.value = toCurrency.value;
        toCurrency.value = temp;
        convertCurrency(); // Auto-convert after swap
    }

    // Event listeners
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    // exchange value will be shown when convert button is clicked.
});
