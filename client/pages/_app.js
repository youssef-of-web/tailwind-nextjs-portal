import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "react-redux";
import store from "../redux/store";
import 'antd/dist/antd.css'
import PageChange from "components/PageChange/PageChange.js";
import jwt_decode from "jwt-decode";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import setAuthToken from "../utils/setAuthToken";
import { set_current_user, LogoutUser } from "../redux/actions/auth";

if (process.browser && window.localStorage.jwtToken) {
  setAuthToken(window.localStorage.jwtToken);

  const decode = jwt_decode(localStorage.jwtToken);

  store.dispatch(set_current_user(decode));

  const currentDate = Date.now() / 1000;

  if (decode.exp < currentDate) {
    store.dispatch(LogoutUser());
    //store.dispatch(ClearCurrentProfile());
  }
}

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

export default class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`


`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      
        <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Portage salarial</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
        </Head>
        <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
          </Provider>
        </Layout>
      </React.Fragment>
      
    );
  }
}
