import Document, { Html, Head, Main, NextScript } from 'next/document'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'

type MyDocumentProps = {
  styles: React.ReactNode
}

export class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.svg" sizes="any" />
          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage
  const cache = createCache()

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          )
        },
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
      </>
    ),
  }
}

export default MyDocument