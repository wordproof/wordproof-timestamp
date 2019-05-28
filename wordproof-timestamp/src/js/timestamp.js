export default async function timestamp(wallet) {
  const postId = wordproofData.postId;
  const post = await getPostById(postId);
  const hash = await getHashById(postId);
  console.log(post);
  console.log(hash);
  const transactionData = getTransactionData(post, hash, wallet);

  /**
   * Interact with the EOS API and save this post onto the blockchain
   */
  try {
    let result = await wallet.eosApi.transact({
      actions: [
        {
          account: 'wordproofeos',
          name: 'save',
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
  let storeRam = wordproofData.storeRam ? true : false
  let storeContent = wordproofData.storeContent ? true : false
  
  return {
    user: wallet.auth.accountName,
    name: wallet.auth.accountName,
    hash: hash,
    saveToTable: storeRam,
    content: storeContent ? post.post_content : '',
    memo: `${post.link} - time-stamped via WordProof.io, bringing WordPress to the blockchain!`,
    receiver: wallet.auth.accountName,
    bytes: parseInt(1024)
  }
}

/**
 * Save Post metadata
 * @param post
 * @param resultData
 * @returns {Promise<Response>}
 */
function savePostMeta(post, resultData, hash) {
  console.log('saving post meta')
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
      'action=wordproof_save_meta' +
      '&post_id='+ post.ID +
      '&date='+ post.post_modified +
      '&date='+ post.post_date +
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