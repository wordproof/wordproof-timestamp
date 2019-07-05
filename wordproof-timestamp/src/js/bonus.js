//Constants
const bonusApi = 'https://api.wordproof.io/api/';
const endpoints = {
  'GET_OR_CREATE_USER': 'user/get_or_create',
  'VALIDATE_USER_FOR_BONUS': 'bonus/validate',
  'REQUEST_TRANSACTION': 'transaction'
};

export default async function getBonus(accountName, network) {
  const chain = getChain(network);
  const isAllowed = await isBonusClaimed(accountName, chain);

  if (isAllowed.allowed) {
    await getUser(accountName, chain);
    const transaction = await requestTransaction(accountName, chain);

    if (transaction.status === 'success') {
      console.log('You got it!');
      return {
        status: 'success',
        message: 'Great news! You have received your first 10 WORD.'
      }
    } else {
      return {
        status: 'failed',
        message: 'Something went wrong with claiming your WORD. Please try again later.'
      }
    }
  } else {
    return {
      status: 'no_change',
      message: 'You already received your first WORD.'
    }
  }
}

async function getUser(accountName, chain) {
  return await fetch(bonusApi + endpoints.GET_OR_CREATE_USER, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      'accountName': accountName,
      'chain': chain
    })
  }).then(response => response.json())
  .then((data) => {
    return data;
  }).catch(error =>
    console.error('Error:', error)
  );
}

async function isBonusClaimed(accountName, chain) {
  return await fetch(bonusApi + endpoints.VALIDATE_USER_FOR_BONUS, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      'accountName': accountName,
      'chain': chain,
      'bonusName': 'bonusOne',
      'databaseOnly': true
    })
  }).then(response => response.json())
  .then((data) => {
    return data;
  }).catch(error =>
    console.error('Error:', error)
  );
}

async function requestTransaction(accountName, chain) {
  return await fetch(bonusApi + endpoints.REQUEST_TRANSACTION, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      'accountName': accountName,
      'chain': chain,
      'bonusName': 'bonusOne',
      'actionToUse': 'transfer'
    })
  }).then(response => response.json())
  .then((data) => {
    return data;
  }).catch(error =>
    console.error('Error:', error)
  );
}

function getChain(network) {
  switch (network) {
    case 'telos_main':
      return 'telos';
    case 'eos_jungle':
      return 'eosJungle';
    default:
      return 'eos'
  }
}

