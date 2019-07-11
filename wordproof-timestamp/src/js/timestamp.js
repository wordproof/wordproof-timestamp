export default async function timestamp(wallet) {
  const postId = wordproofData.postId;
  const hash = await getHashById(postId);
  const transactionData = getTransactionData(wallet, hash);

  /**
   * Interact with the EOS API and save this post onto the blockchain
   */
  try {
    let result = await wallet.eosApi.transact({
      actions: [
        {
          account: 'wordtokeneos',
          name: 'stamp',
          authorization: [
            {
              actor: wallet.auth.accountName,
              permission: wallet.auth.permission
            }
          ],
          data: transactionData
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    });

    /**
     * The Post is timestamped
     */
    console.log('Success', result);
    if (typeof result.processed !== 'undefined') {
      return saveTimestamp(postId, result.processed.id);
    }

  } catch (error) {
    /**
     * Something went wrong
     */
    console.log('Fail', error);
  }
}

function getPaybackAccount(network) {
  if (network === 'eos_jungle') {
    return 'wordproofdev';
  } else if (network === 'telos_main') {
    return 'wordproofio1';
  } else {
    return 'wordproof.io';
  }
}

/**
 * Get data for the blockchain transaction
 * @param wallet
 * @param hash
 * @returns {{user: *, name: *, hash, saveToTable: boolean, content: string, memo: string, receiver: *, bytes: number}}
 */
function getTransactionData(wallet, hash) {
  const paybackAccount = getPaybackAccount(wordproofData.network);
  return {
    from: wallet.auth.accountName,
    to: paybackAccount,
    quantity: '1.0000 WORD',
    memo: `${wordproofData.permalink} - content protected with WordProof Timestamp, WordProof.io`,
    hash: hash,
  }
}

/**
 * Save Post metadata
 * @param transactionId
 * @returns {Promise<Response>}
 */
function saveTimestamp(postId, transactionId) {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
      'action=wordproof_save_timestamp' +
      '&post_id='+ postId +
      '&transaction_id='+ transactionId +
      '&security='+ wordproofData.ajaxSecurity,
  });
}

/**
 * Get the generated hash
 * @returns {Promise<Response | void>}
 */
function getHashById($postId) {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
    'action=wordproof_get_hash_by_id' +
    '&security='+ wordproofData.ajaxSecurity +
    '&post_id='+ $postId,
  }).then((response) => {
    return response.json();
  })
  .catch(error => console.error(error));
}