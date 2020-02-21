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
import { ActionCableConsumer } from 'react-actioncable-provider';
import './Styles/AppNav.css'



class App extends React.Component {


  state = {
    loggedInUserId: null,
    token: null,
    username: null
  }

  gotToken = (token, loggedInUserId, username) => {
    // debugger
    console.log("logged in", token)
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
    console.log("componentDidMount", localStorage.token, this.state);
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
    <div className="App" style={{"margin-top":"28px", "margin-bottom":"18px"}}>

      {/* // NavBar begins */}  
      {/* <nav class="navbar" style={{'margin-bottom': '24px'}}>
      <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed" >
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
                    <a href="/events" class="nav-links"> All Events  </a>
                  </li>

                  <li>
                    <a href="/main" class="nav-links"> All Trails</a>
                  </li>
                

                  
                </ul>
                </div> */}

                  <div class="header" style={{"margin-bottom":"28px"}}>
                    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed" style={{"background-color":"white"}}>
                        
                        <a  href="#" >
                                {this.state.username ? 
                                <a class="pure-menu-heading" href="" > Welcome  {this.state.username} </a>
                                // <text>Welcome {this.state.username} </text> 
                                : null}
                        </a>

                        <ul class="pure-menu-list">
                            <li class="pure-menu-item pure-menu-selected"><a href="/main" class="pure-menu-link">MAP</a></li>
                            <li  onClick={this.goBack} class="pure-menu-item"><a href="#" class="pure-menu-link">Go Back </a></li>
                            <li  onClick={this.logOutClicked} class="pure-menu-item"><a href="#" class="pure-menu-link">Log out  </a></li>
                            <li class="pure-menu-item"><a href="/events" class="pure-menu-link">All Events </a></li>
                            <li class="pure-menu-item"><a href="/trails" class="pure-menu-link">All Trails </a></li>
                        </ul>
                    </div>
                </div>
              {/* </nav> */}
          {/* // NavBar ends  */}

      <Switch>
        <Route exact path='/'  render={(routerProps) => {return <Login gotToken={this.gotToken} {...routerProps}/>}} />
        <Route path={'/trails'} component={TrailsContainer} state={this.state.loggedInUserId}/>
        <Route path={'/events'} component={EventsContainer} />
        <Route exact path={'/main'} component={HomePage} />
      </Switch>

    </div>
  )
  };
}

export default withRouter(App);
