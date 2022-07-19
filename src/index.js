import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <MuiThemeProvider>
        <div>
            <div className='title'><h1>Games Space</h1></div>
            <App />

        </div>
    </MuiThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
