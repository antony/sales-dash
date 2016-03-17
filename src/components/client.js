import React from 'react';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
injectTapEventPlugin();

render(<App />, document.getElementById('app'));
