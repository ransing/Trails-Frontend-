import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ActionCableProvider} from 'react-actioncable-provider';



// import 'semantic-ui/dist/semantic.min.css';


ReactDOM.render(
        <ActionCableProvider url = 'ws://trailsbackend1.herokuapp.com/cable'>
        <BrowserRouter> 
            <App />
         </BrowserRouter>
         </ActionCableProvider>,
        
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
