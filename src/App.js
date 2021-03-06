import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Plants from './components/Plants.jsx'
import Home from './components/Home.jsx'
import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import ShowPlant from './components/ShowPlant'



class App extends Component {

  render() {
    return (
      <div>
        < Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/plants' component={Plants}/>
          <Route exact path='/plants/:id' component={ShowPlant}/>
        </Switch>
        < Footer />
      </div>
    )
  }    
}
        

export default App;