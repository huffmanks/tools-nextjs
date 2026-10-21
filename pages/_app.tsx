import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

import { ThemeProvider } from "@mui/material/styles";

import GlobalStateProvider from "@/context/GlobalContext";
import "@/styles/globals.css";
import theme from "@/theme";

import Toast from "@/components/common/Toast";
import Layout from "@/components/layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {process.env.NODE_ENV === "production" && !process.env.STAGING && (
        <Script
          strategy="afterInteractive"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "3e54585eb2634c0196e442b6a16602cf"}'
        />
      )}

      <ThemeProvider theme={theme}>
        <GlobalStateProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toast />
        </GlobalStateProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
