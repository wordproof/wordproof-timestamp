const base = 'https://api.eos.miami'

export async function getAccount (account = '') {
  const response = await fetch(`${base}/v1/chain/get_account`, {
    method: 'POST',
    body: JSON.stringify({ account_name: account })
  })
  if (response.ok) {
    return response.json()
  } else {
    return null
  }
}

export async function createAccount (accountName, ownerKey, activeKey, identifiers) {
  const formData = new URLSearchParams()
  formData.append('account_name', accountName)
  formData.append('owner_key', ownerKey)
  formData.append('active_key', activeKey)
  formData.append('identifiers', identifiers)

  const response = await fetch(`${base}:1460/`, {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })

  if (response.ok) {
    return true
  } else {
    return false
  }
}