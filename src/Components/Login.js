import React, { Component } from 'react';
import '../Styles/Login.css'

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
    console.log(event.target.value)
  }

  logInSubmitted = (event) => {
    event.preventDefault()
    console.log("clicked login")
    // make a fetch
    fetch("http://trailsbackend1.herokuapp.com/login", {
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
    fetch("http://trailsbackend1.herokuapp.com/signup", {
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

    render() {

    return (
    <React.Fragment>
    
    <h1 class="animated infinite pulse delay-2s" id="title" style={{"font-size": "48px" }} ></h1>
    <h2 id="title" style={{"font-size": "32px" }}></h2><br/>
      <ul>
        {
          this.state.errors.map(error => <li>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
       
        <section id="login-div">
        {/* <div className="inset"  > */}
          <h2 id="title" style={{"font-size": "32px", "font-family":"Nunito" }}><b>Log In</b> </h2>
          <button className="account" style={{ "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} 
          onClick={ () => this.setState({ logIn: false }) }>Sign Up</button><br/>
          <br/>
                <form className="form-signin" onSubmit={ this.logInSubmitted }>
            <div style={{"margin-bottom":"16px", "padding":"20px"}}>
            <label  id="label" style={{"font-family":"Nunito","font-color":"white", "font-weight":"bold" }} htmlFor="log_in_username">Username</label>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange /* for controlled form input status */ } 
                    name="username"
                    placeholder="existing username" 
                    value={ this.state.username /* for controlled form input status */ } 
                    />
                    </div>
              <div>
            <label  id="label" style={{"font-family":"Nunito", "font-color":"white", "font-weight":"bold" }} htmlFor="log_in_password">Password</label>
            <input  id="log_in_username"  
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="existing password"
                    value={ this.state.password } 
                    />
            </div>
            <input onClick={this.logInSubmitted} class="submit-button" style={{'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px', "font-family":"Nunito", "font-size":"16 px"}} type="submit" />
          </form>
        {/* </div> */}
        </section>

        :
        
        <section id="login-div" >
        
          <h2 style={{"font-size": "24px" }}>Sign up </h2><br/>
          <button class="accountbutton" style={{"font-family":"Nunito", "font-size":"14 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}}onClick={ () => this.setState({ logIn: true }) }>Already have an account</button><br/>
          <br/>
          <form className="form-signin" onSubmit ={this.signupSubmit} style={{"padding":"24px"}}>
            <div >
            <label   style={{"font-family":"Nunito", "font-size":"18 px", "font-color":"white"}} htmlFor="sign_up_username">Username</label>
            <input  id="log_in_username" 
                    type="text" 
                    onChange={ this.handleChange } 
                    name="username" 
                    placeholder="new username"
                    value={ this.state.username } />
                    </div>
                    <div>
            <label  style={{"font-family":"Nunito", "font-size":"18 px", "font-color":"white"}} htmlFor="sign_up_password">Password</label>
            <input  id="log_in_username"  
                    type="password" 
                    onChange={ this.handleChange } 
                    name="password" 
                    placeholder="new password"
                    value={ this.state.password } />
                    </div>
            <input class="submit-button" style={{"font-family":"Nunito", "font-size":"16 px", 'padding': '4px 12px', 'border-radius': '50px', 'margin-top': '16px'}} type="submit" />
          </form>
  
        </section>
        
      }
    
    </React.Fragment>
    )
} }
