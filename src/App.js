import React, { Component } from "react";
import "./App.css";

import Header from "./containers/Header";

class App extends Component {
  render() {
    console.log("App.js is 🚀");
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
