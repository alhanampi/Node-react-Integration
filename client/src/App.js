import React, { Component } from 'react';
import './css/styles.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './components/Navbar'
import Detail from './components/Detail'
import Searchs from './components/Searchs'

class App extends Component {


  //views:
  render() {
    //routes and links:

    return (
      <div>

        <BrowserRouter>
          <div>
            <NavBar inputChange={this.inputChange}></NavBar>
            <Route path="/search" component={Searchs} />
            <Route path="/details/:id" component={Detail} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
