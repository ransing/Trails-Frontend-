import React, { Component } from 'react';
import {Button, Form} from 'semantic-ui-react'

export default class EventComments extends Component {


    state = {
        comment: "",
        commentArray: this.props.event.event_comments
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount(){
        // this.setState({
        //     commentArray: this.state.commentArray
        // })
    }

    componentDidUpdate(){
        // console.log("update");
        // console.log(this.state.commentArray)
    }

    mount =()=>{
        this.componentDidUpdate()
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // let comment = this.state.comment
        // console.log(this.state.answer)
        // this.setState({
        //     comment: ""
        // })
        const sendToken = localStorage.token
        fetch("http://localhost:3000/event_comments",{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                'Authorization': sendToken
            },
            body: JSON.stringify({
                event_comment: {
                    details: this.state.comment,
                    user_id: this.props.userId,
                    event_id: this.props.event.id,
                }
            })
        })
        .then(r=>r.json())
        .then(newComment =>{
            // console.log(newComment.user.username)
            this.setState({
                commentArray: [...this.state.commentArray, newComment],
                comment: ""
            })
        })
    }


    deleteComment = (e) => {
        fetch(`http://localhost:3000/event_comments/${e.target.dataset.id}`, {
            'method': 'DELETE'
        })
        .then(r => {
            this.forceUpdate()
            this.setState({
                commentArray: this.state.commentArray
            })
        })
    }


    

    render() {

        const eventComment = this.state.commentArray.map(e => (
                            <React.Fragment>
                            <li>{e.details}-{e.user_name} <button data-id={e.id} onClick={this.deleteComment}>X</button> </li>
                            </React.Fragment>
                        )
                    )

        return (
            <div>
                <React.Fragment>
                <div>
                    Event Comments:
                    {eventComment}
                </div>

                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Form.Input
                        fluid
                        placeholder="Insert Comment Here" 
                        name="comment"
                        value={this.state.comment}
                        onChange={this.handleChange}
                        required
                    />
                    <Button id="submit-button" style={{"font-family":"Special Elite", "border-radius": "50px"}} type="submit">Submit Comment</Button>
                </Form>
                </React.Fragment>


            </div>
        )
    }
}
