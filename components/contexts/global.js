 
import React, { Component, createContext } from 'react';

export const GlobalContext = createContext();

class Global extends Component {
  state = {
    isLightTheme: true,
    light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
    dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
  }
  render() { 
    return (
      <GlobalContext.Provider value={{...this.state}}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
 
export default Global;