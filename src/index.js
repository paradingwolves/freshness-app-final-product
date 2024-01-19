import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from './lib/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>,
  document.getElementById('root')
);


