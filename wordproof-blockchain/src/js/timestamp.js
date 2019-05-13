import sha256 from 'js-sha256'

export default async function timestamp(wallet) {
  const post = await getPost()
  const data = getData(post, wallet)
  console.log(post)
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
          data: data
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    })
  
    console.log('Success', result)
    if (typeof result.processed !== 'undefined') {
      return postMetaData(post, result.processed)
    }

  } catch (error) {
    console.log('Fail', error)
  }
}

function getData(post, wallet) {
  let storeRam = wordproofData.storeRam ? true : false
  let storeContent = wordproofData.storeContent ? true : false
  
  return {
    user: wallet.auth.accountName,
    name: wallet.auth.accountName,
    hash: sha256(JSON.stringify({title: post.post_title, content: post.post_content})),
    saveToTable: storeRam,
    content: storeContent ? post.post_content : '',
    memo: `${post.guid} - time-stamped via WordProof.io, bringing WordPress to the blockchain!`,
    receiver: wallet.auth.accountName,
    bytes: parseInt(1024)
  }
}

function getPost() {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
      'action=wordproof_get_post' +
      '&security='+ wordproofData.ajaxSecurity +
      '&post_id='+ wordproofData.postId,
  }).then(response => response.json())
      .then(data => data) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
}

function postMetaData(post, resultData) {
  return fetch(wordproofData.ajaxURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body:
      'action=wordproof_post_meta_data' +
      '&post_id='+ post.ID +
      '&date='+ post.post_modified +
      '&title='+ post.post_title +
      '&content='+ post.post_content +
      '&transaction_id='+ resultData.id +
      '&block_num='+ resultData.block_num +
      '&block_time='+ resultData.block_time +
      '&network='+ wordproofData.network +
      '&security='+ wordproofData.ajaxSecurity,
  });
}