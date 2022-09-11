import React, { Component, Fragment } from 'react'
import ReactDOM from "react-dom";

import Header from "./components/layout/Header";
import SignUpForm from "./components/Form";
import UserList from "./components/UserList"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Fragment>
            <Header />
              <Routes>
                <Route exact path="/user_list" element={<UserList />} />
                <Route exact path="/" element={<SignUpForm />} />
              </Routes>
          </Fragment>
        </Router>
      </div>
    );  
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
