import Document, { Head, Html, Main, NextScript } from "next/document";
import ReactNotification from "react-notifications-component";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <ReactNotification />
        </div>
        <Main />
        <NextScript />
      </Html>
    );
  }
}

export default MyDocument;
