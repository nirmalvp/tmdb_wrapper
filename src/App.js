import { BrowserRouter, Switch, Route } from "react-router-dom"

import React, { Component } from 'react';
import Header from "./header/header"
import Main from "./main/main"
import Movie from "./movie/movie"
import NotFound from "./notfound"



class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path="/movies/:movieId" component={Movie} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
