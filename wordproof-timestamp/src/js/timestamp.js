export default async function timestamp(wallet) {
  const postId = wordproofData.postId;
  const post = await getPostById(postId);
  const hash = await getHashById(postId);
  const transactionData = getTransactionData(post, hash, wallet);

  /**
   * Interact with the EOS API and save this post onto the blockchain
   */
  try {
    let result = await wallet.eosApi.transact({
      actions: [
        {
          account: 'wordtoken111',
          name: 'stamp',
          quantity: '1 WORD', //TODO: decimals
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
      return savePostMeta(post, result.processed, hash);
    }

  } catch (error) {
    /**
     * Something went wrong
     */
    console.log('Fail', error);
  }
}

/**
 * Get data for the blockchain transaction
 * @param post
 * @param wallet
 * @returns {{user: *, name: *, hash, saveToTable: boolean, content: string, memo: string, receiver: *, bytes: number}}
 */
function getTransactionData(post, hash, wallet) {
  return {
    from: wallet.auth.accountName,
    to: 'wordproofdev',
    quantity: '1 WORD',
    memo: `${post.link} - time-stamped via WordProof.io, bringing WordPress to the blockchain!`,
    hash: hash,
  }
}

/**
 * Save Post metadata
 * @param post
 * @param resultData
 * @returns {Promise<Response>}
 */
function savePostMeta(post, resultData, hash) {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
      'action=wordproof_save_meta' +
      '&post_id='+ post.ID +
      '&date='+ post.post_modified +
      '&post_date='+ post.post_date +
      '&title='+ post.post_title +
      '&content='+ post.post_content +
      '&link='+ post.link +
      '&transaction_id='+ resultData.id +
      '&block_num='+ resultData.block_num +
      '&block_time='+ resultData.block_time +
      '&network='+ wordproofData.network +
      '&hash='+ hash +
      '&security='+ wordproofData.ajaxSecurity,
  });
}

/**
 * Get the post data
 * @returns {Promise<Response | void>}
 */
function getPostById($postId) {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
    'action=wordproof_get_post_by_id' +
    '&security='+ wordproofData.ajaxSecurity +
    '&post_id='+ $postId,
  }).then((response) => {
    return response.json();
  })
  .catch(error => console.error(error));
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