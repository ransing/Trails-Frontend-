import React, { Component } from 'react';
import '../Styles/Login.css';
import YouTube from 'react-youtube';

export default class Login extends Component {


  state = {
    logIn: false,
    username: "",
    password: "",
    errors: []
  }

  handleChange = event => {
    //   console.log(this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logInSubmitted = (event) => {
    event.preventDefault()
    console.log("clicked login")
    // make a fetch
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.props.history.push('/main')
        console.log(data)
        this.props.gotToken(data.token, data.user_id, this.state.username)
      }
    })
    // when fetch is done...get token
  }

  signupSubmit = (event) => {
    event.preventDefault()
    console.log("clicked submit ")
    // make a fetch
    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username, 
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors
        })
      } else {
        this.props.history.push('/main')
        console.log(data)
        this.props.gotToken(data.token, data.user_id, this.state.username)
      }
    })
    // when fetch is done...get token
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

    render() {

      const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        }
      };
    return <>
    
    <h1></h1>
    <h1 class="animated infinite pulse delay-2s" id="title" style={{"font-size": "48px" }} > Trail.blzr </h1>
    <h2 id="title" style={{"font-size": "32px" }}></h2>Recreational Outdoor Meetups<br/>
      <ul>
        {
          this.state.errors.map(error => <li>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <div className="inset">
          <h2 id="title" style={{"font-size": "24px" }}>Log In </h2>
          <button class="accountbutton" style={{"font-family":"Noto Sans", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} 
          onClick={ () => this.setState({ logIn: false }) }>Sign Up</button><br/>
          <br/>
                <form className="form-signin" onSubmit={ this.logInSubmitted }>
            <div>
            <label  id="label" style={{"font-family":"Noto Sans", "color":"white"}} htmlFor="log_in_username">Username</label>
            <input  
                    style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}}
                    id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange /* for controlled form input status */ } 
                    name="username"
                    placeholder="existing username" 
                    value={ this.state.username /* for controlled form input status */ } 
                    />
                    </div>
              <div>
            <label  id="label1" style={{"font-family":"Noto Sans","color":"white"}} htmlFor="log_in_password">Password</label>
            <input  
                    style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}}
                    id="log_in_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="existing password"
                    value={ this.state.password } 
                    />
            </div>
            <input onClick={this.logInSubmitted} class="submit-button" style={{'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px', "font-family":"Noto Sans", "font-size":"16 px"}} type="submit" />
          </form>
        </div>
        :
        <section>
          <h2 id="title" style={{"font-size": "24px" }}>Sign up </h2><br/>
          <button class="accountbutton" style={{"font-family":"Noto Sans", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}}onClick={ () => this.setState({ logIn: true }) }>Already have an account</button><br/>
          <br/>
          <form onSubmit ={this.signupSubmit}>
            <div>
            <label  style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}} htmlFor="sign_up_username">Username</label>
            <input  
                    style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}}
                    id="sign_up_username" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="username" 
                    placeholder="new username"
                    value={ this.state.username } />
                    </div>
                    <div>
            <label  style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}} htmlFor="sign_up_password">Password</label>
            <input  
                    style={{"font-family":"Noto Sans", "font-size":"18 px", "color":"white"}}
                    id="sign_up_password" 
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="new password"
                    value={ this.state.password } />
                    </div>
            <input class="submit-button" style={{"font-family":"Noto Sans", "font-size":"16 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} type="submit" />
          </form>
        </section>
      }

      <h3>Watch the demo here</h3>
      <YouTube
        
        videoId="j_NW0a5vQIg"
        opts={opts}
        onReady={this._onReady}
      />
    </>
    
    }
}
