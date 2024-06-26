import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
);