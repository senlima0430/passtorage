import { FC } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider, localStorageManager } from '@chakra-ui/core'

import { theme } from 'utils/theme'
import { AuthProvider } from 'contexts/auth'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider
      resetCSS
      theme={theme}
      colorModeManager={localStorageManager}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
