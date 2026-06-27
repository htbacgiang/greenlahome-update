import "../styles/globals.css";
import { Rajdhani } from "next/font/google";
import { Provider } from "react-redux";
import store from "../store";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";
import "../styles/seo-analysis.css";
import "../styles/editor.css";
import "../styles/q8design.css";
import Head from "next/head";
import { normalizeSiteImageUrl } from "../utils/imageUrls";

const persistor = typeof window !== "undefined" ? persistStore(store) : null;

function ReduxPersistGate({ children }) {
  if (!persistor) return children;

  return (
    <PersistGate loading={children} persistor={persistor}>
      {children}
    </PersistGate>
  );
}

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});

function MyApp({ Component, pageProps: { session, meta, ...pageProps } }) {
  const siteUrl = process.env.NEXT_PUBLIC_HOST || "https://greenlahome.vn";
  const normalizedMeta = meta
    ? {
        ...meta,
        og: meta.og
          ? {
              ...meta.og,
              image: normalizeSiteImageUrl(meta.og.image, siteUrl),
            }
          : meta.og,
        twitter: meta.twitter
          ? {
              ...meta.twitter,
              image: normalizeSiteImageUrl(meta.twitter.image, siteUrl),
            }
          : meta.twitter,
      }
    : null;

  return (
    <>
      {/* Render meta tags từ pageProps */}
      {normalizedMeta && (
        <Head>
          <title>{normalizedMeta.title}</title>
          <meta name="description" content={normalizedMeta.description} />
          <meta name="keywords" content={normalizedMeta.keywords} />
          <meta name="robots" content={normalizedMeta.robots} />
          <meta name="author" content={normalizedMeta.author} />
          <link rel="canonical" href={normalizedMeta.canonical} />

          {/* Open Graph */}
          <meta property="og:title" content={normalizedMeta.og?.title} />
          <meta property="og:description" content={normalizedMeta.og?.description} />
          <meta property="og:type" content={normalizedMeta.og?.type} />
          <meta property="og:image" content={normalizedMeta.og?.image} />
          <meta property="og:image:width" content={normalizedMeta.og?.imageWidth} />
          <meta property="og:image:height" content={normalizedMeta.og?.imageHeight} />
          <meta property="og:url" content={normalizedMeta.og?.url} />

          {/* Twitter Cards */}
          <meta name="twitter:card" content={normalizedMeta.twitter?.card} />
          <meta name="twitter:title" content={normalizedMeta.twitter?.title} />
          <meta name="twitter:description" content={normalizedMeta.twitter?.description} />
          <meta name="twitter:image" content={normalizedMeta.twitter?.image} />
          <meta name="google-site-verification" content="Guo-bobkr2INf1rOD4cc1AbPyp9IPNEiD2v0WJSVaDs" />
        </Head>
      )}
      <SessionProvider session={session}>
        <Provider store={store}>
          <ReduxPersistGate>
            <div className={rajdhani.variable}>
              <Toaster />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                style={{ zIndex: 10001 }}
              />
              <Component {...pageProps} />
            </div>
          </ReduxPersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
