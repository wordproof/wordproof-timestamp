import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'

export default function getWallet() {
  const networks = {
    eos_main: {
      host: 'eos.greymass.com',
      port: 443,
      protocol: 'https',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    },
    telos_main: {
      host: 'apinode.telosgermany.io',
      port: 443,
      protocol: 'https',
      chainId: '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11'
    },
    eos_jungle:{
      host: 'api.jungle.alohaeos.com',
      port: 443,
      protocol: 'https',
      chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    }
  }
  const accessContext = initAccess()
  const walletProviders = accessContext.getWalletProviders()
  const selectedProvider = walletProviders[0]

  function initAccess() {
    let appName = 'wordproof_'
    appName += (typeof wordproofData.network === 'string') ? wordproofData.network : 'eos_main'

    let network = typeof networks[wordproofData.network] !== 'undefined'
        ? networks[wordproofData.network]
        : networks['eos_main'];

    let options = {
      appName: appName,
      network: network,
      walletProviders: [
        scatter()
      ]
    }

    return initAccessContext(options);
  }
  return accessContext.initWallet(selectedProvider)
}