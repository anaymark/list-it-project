import React from 'react';
//for isolation testing, no need for sub-component testing
import ReactDOM from 'react-dom';
import App from './App';


  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });



  


