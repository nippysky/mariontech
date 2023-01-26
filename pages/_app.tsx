import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import ScrollUp from "../components/ScrollUp";
import { Poppins } from "@next/font/google";
import { NextFont } from "@next/font";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const poppins: NextFont = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <NextNProgress
          color="#512116"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
          options={{ easing: "ease", speed: 500 }}
        />
        <ScrollUp />
        <PersistGate persistor={persistor}>
          <main className={poppins.className}>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-center"
              limit={1}
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
            />
          </main>
        </PersistGate>
      </Provider>
    </>
  );
}
