import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const Wallet = () => {
  const { chainId, account, library, activate, active } = useWeb3React<
      Web3Provider
      >()

  const onClick = () => {
    activate(injectedConnector)
  }

  return (
      <div>
        <div>ChainId: {chainId}</div>
        <div>Account: {shorter(account)}</div>
        {active ? (
            <div>✅ </div>
        ) : (
            <button type="button" onClick={onClick}>
              Connect
            </button>
        )}
        {active && (
            <SWRConfig value={{ fetcher: fetcher(library, ERC20ABI) }}>
              <EthBalance />
              <TokenList chainId={chainId} />
            </SWRConfig>
        )}
      </div>
  )
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Wallet />
    </Web3ReactProvider>
  )
}

export default App
