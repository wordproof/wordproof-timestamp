import axios from 'axios';
import qs from "qs";

document.addEventListener('DOMContentLoaded', function () {
  initRefreshBalance();
});

function initRefreshBalance() {
    let link = document.querySelector('#wp-admin-bar-wordproof-balance > a.ab-item');
    if (link) {
        link.addEventListener('click', () => {
            request();
        });
    }
}

async function request() {
    const config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    const body = {
        action: 'wordproof_get_refreshed_balance',
        security: wordproofBarData.ajaxSecurity
    };

    await axios.post(wordproofBarData.ajaxURL, qs.stringify(body), config)
    .then((response) => {
        const result = response.data;
        if (result.balance) {
            let amount = document.querySelector('#wp-admin-bar-wordproof-balance .ab-item .timestamps-left > .amount');
            console.log(amount);
            amount.innerText = result.balance;
        }
        console.log(result);
        return result;
    })
    .catch((error) => {
        console.log(error);
    });
}


