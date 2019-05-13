import ecc from 'eosjs-ecc'
import { createAccount as registerAccount, getAccount } from './api'

export async function checkAccountAvailability (acc = '') {
  const account = await getAccount(acc)
  return account === null
}

export function accountNameValid (acc = '') {
  const match = acc.match(/^[a-zA-Z1-5]{12}$/g)
  if (match && match[0] === acc) {
    return true
  } else {
    return false
  }
}

export async function createAccount (accountName, ownerKey, activeKey) {
  const identifiers = `${generateMacaddress()},${generateMacaddress()},${generateMacaddress()}`
  const response = await registerAccount(accountName, ownerKey, activeKey, identifiers)
  return response
}

export async function generateKeyPair () {
  const privateKey = await ecc.randomKey()
  const publicKey = ecc.privateToPublic(privateKey)
  return {
    private: privateKey,
    public: publicKey
  }
}

function generateMacaddress () {
  const mac = 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
    return "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
  })
  return mac
}
