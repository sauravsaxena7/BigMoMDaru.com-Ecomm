import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Store1 from "./Store";
import {Provider} from "react-redux";





const root = ReactDOM.createRoot(document.getElementById('root'));







root.render(

  <Provider store={Store1}>
    <App />

  </Provider>
  
  
  
);

