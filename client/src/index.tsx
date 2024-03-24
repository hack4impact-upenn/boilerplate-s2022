import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals.ts';
import App from './App.tsx';
import { AlertProvider } from './util/context/AlertContext.tsx';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <AlertProvider>
    <App />
  </AlertProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
