import '@/styles/globals.css'
import React from 'react'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import PageLayout from '@/components/Layout'
import theme from '@/config/theme'
import { AppStateProvider } from '@/provider/AppState'

const App = ({ Component, pageProps }: AppProps) => (
  <AppStateProvider>
    <ConfigProvider theme={theme}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ConfigProvider>
  </AppStateProvider>
)

export default App