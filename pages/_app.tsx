import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'lib/theme.js';
import Navbar from 'components/Navbar';
import "styles/main.scss"
import { wrapper } from 'redux/store';
import * as t from "redux/types";
import { firebase } from "firebase/clientApp"
import { store } from "redux/store"
import { createFirestoreInstance } from "redux-firestore";

const MyApp = (props) => {
  const { Component, pageProps } = props;
  const dispatch = store.dispatch

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    dispatch({ type: t.SET_WINDOW_WIDTH })
    window.addEventListener('resize', () => dispatch({ type: t.SET_WINDOW_WIDTH }))

    return () => window.removeEventListener('resize', () => dispatch({ type: t.SET_WINDOW_WIDTH }))
    // eslint-disable-next-line
  }, [])

  const rrfConfig = {
    attachAuthIsReady: true,
    userProfile: 'users',
    useFirestoreForProfile: true,
    oneListenerPerPath: true
  };

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, //since we are using Firestore
  };

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
        <ThemeProvider theme={theme}>
          <Navbar />
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </ReactReduxFirebaseProvider> */}
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp)