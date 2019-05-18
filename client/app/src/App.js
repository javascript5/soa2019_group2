import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from './Pages/Home'

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Home} />
        <Route path="/post" component={Home} />
        <Route path="/offer" component={Home} />
        <Route path="/search" component={Home} />
        <Route path="/profile" component={Home} />
        <Route path="/logout" component={Home} />
      </div>
    )
  }
}

export default App