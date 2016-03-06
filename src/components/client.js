import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
ReactDOM.render(<Main />, document.getElementById('app'));
