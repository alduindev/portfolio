import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#root-modal');
const processRoot = document.querySelector('#root-process');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const Modal = ({ children }) => {
  return modalRoot ? createPortal(children, modalRoot) : null;
};

export const Process = ({ children }) => {
  return processRoot ? createPortal(children, processRoot) : null;
};
