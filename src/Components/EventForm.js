import React, { Component } from 'react'
import {Segment, Container, Form, Input, Button, Header, TextArea} from 'semantic-ui-react'
import '../App.css'

export default class EventForm extends Component {

    state = {
        event: "",
        token: localStorage.token
    }

    

    handleChange = (e) => {
        // debugger
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        // debugger
        e.preventDefault()
        let event = this.state.
        // console.log(this.state.answer)
        this.setState({
            answer: ""
        }, () =>  this.props.handleSubmit(event))
       
    }


    render() {
        return (
            <div>
                <h3>{this.props.question}</h3>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Input
              fluid
              placeholder=" " 
              name="event"
              value={this.state.event}
              onChange={this.handleChange}
              required
              />
            <Button id="submit-button" style={{"font-family":"Special Elite", "border-radius": "50px"}} type="submit">Submit </Button>
            </Form>
            
            </div>
        )
   
    }
}
