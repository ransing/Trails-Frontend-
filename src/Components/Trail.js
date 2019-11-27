import React, { Component } from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import EventForm from './EventForm'

export default class Trail extends Component {

    state = {
        addEventTrail: "",
        addEventTrailName: "",
        token: localStorage.token
    }

    addEvent = (props) => {
        this.setState({
            addEventTrail: this.props.trailItem.id,
            addEventTrailName: this.props.trailItem.name
        })
        console.log(this.props.trailItem.id)
    }

    cancelForm = () => {
        this.setState({
            addEventTrail: ""
        })
    }
    

    alertCreate = () => {
        alert("created event")
    }


    onNewEventSubmit = (event) => {
        // e.preventDefault()
        console.log(event)
        fetch("http://localhost:3000/events", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                event: {
                    ...event,
                    trail_id: this.props.trailItem.id,
                }
            })
        })
        .then(r => r.json())
        .then( r => {
            console.log(r)
            // debugger
        }
        ,this.alertCreate()
        )
        this.setState({
            addEventTrail: ""
        })
    }

  render() {
    // console.log(this.props.trailItem);
    return (

    <React.Fragment>
        <div>
           {this.state.addEventTrail !== "" ?
                    <EventForm trailId={this.props.trailItem.id} cancelForm={this.cancelForm} addEventTrailName={this.state.addEventTrailName} onNewEventSubmit={this.onNewEventSubmit} />
                    : 
                    null
            }
        </div>
            <Flippy
                    flipOnHover={false} // default false
                    flipOnClick={true} // default false
                    flipDirection="horizontal" // horizontal or vertical
                    ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                    // if you pass isFlipped prop component will be controlled component.
                    // and other props, which will go to div
                    style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
                >

            <FrontSide
                    style={{
                        backgroundColor: '#faf0d8',
                    }}
                >
                    {this.props.trailItem.name}
                    <img src={`${this.props.trailItem.imgSmall}`} style={{"max-width": "100%", "max-height": "100%"}}></img>
            </FrontSide>

            <BackSide
                    style={{ backgroundColor: '#175852'}}>
                    <img src={`${this.props.trailItem.imgMedium}`} style={{"max-width": "100%", "max-height": "100%"}}></img>
                    <button onClick={this.addEvent}> Add Event </button>
            </BackSide>

            </Flippy>

    </React.Fragment>   
    )
  }
}
