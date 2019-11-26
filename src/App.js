import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './Containers/HomePage';
import { Route, Switch, withRouter, NavLink } from 'react-router-dom';
import Login from './Components/Login';
import Trails from './Components/Trail';
import Events from './Components/Event';
// for routes 
import TrailsContainer from './Containers/TrailsContainer';
import EventsContainer from './Containers/EventsContainer';
import Trail from './Components/Trail';



class App extends React.Component {


  state = {
    loggedInUserId: null,
    token: null,
    username: null
  }

  gotToken = (token, loggedInUserId, username) => {
    // debugger
    // console.log("logged in", token)
    localStorage.token = token
    localStorage.loggedInUserId = loggedInUserId
    localStorage.username = username
    this.setState({
      token,
      loggedInUserId,
      username
    })
  }

  logOutClicked = () => {
    localStorage.clear()
    // localStorage.token = null
    // localStorage.loggedInUserId = null
    // debugger
    this.setState({
      token: null,
      loggedInUserId: null,
      username: null
    })
    // console.log(props);
    
    this.props.history.push('/')
  }

  componentDidMount(){
    console.log("componentDidMount", localStorage.token);
    if (localStorage.token) {
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.loggedInUserId,
        username: localStorage.username
      })
    }
  }

  goBack = () => {
    this.props.history.go(-1)
  }

  render () { 

  return (
    <div className="App">

      {/* // NavBar begins */}  
      <nav class="navbar" style={{'margin-bottom': '24px'}}>
                <ul class="main-nav" id="js-menu">
                  <li>
                      <a  href="#" class="nav-links">
                        {this.state.username ? 
                        <text>Welcome {this.state.username} </text> 
                        : null}
                      </a>
                  </li>

                  <li>
                    <a onClick={this.logOutClicked} href="#" class="nav-links">Log Out </a>
                  </li>

                  <li>
                    <a onClick={this.goBack} href="#" class="nav-links"> Go Back </a>
                  </li>

                  <li>
                    <i class="fa fa-github" style={{"font-size":"20px"}}></i>
                  </li>
                </ul>
              </nav>
          {/* // NavBar ends  */}

      <Switch>
        <Route exact path='/'  render={(routerProps) => {return <Login gotToken={this.gotToken} {...routerProps}/>}} />
        <Route path={'/trails'} component={Trails} />
        <Route path={'/events'} component={Events} />
        <Route exact path={'/main'} component={HomePage} />
      </Switch>

    </div>
  )
  };
}

export default withRouter(App);
