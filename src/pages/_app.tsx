import "../../public/assets/styles/styles.scss";
import "nprogress/nprogress.css";
import "react-notifications-component/dist/theme.css";

import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../store";
import Router from "next/router";
import NProgress from "nprogress";
import MainLayout from "../components/layout";
import Head from "next/head";

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, router }) {
  return (
    <Provider store={store}>
      <MainLayout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} key={router.route} />
      </MainLayout>
    </Provider>
  );
}

const wrapper = createWrapper(() => store);
export default wrapper.withRedux(MyApp);
