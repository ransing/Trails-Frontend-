import React, { Component } from 'react'
import Event from '../Components/Event';


export default class EventsContainer extends Component {

    state = {
        events: []
    }

    deleteEvent = (e) =>{
        console.log(e);
        fetch(`http://localhost:3000/events/${e}`, {
            'method': 'DELETE'
        })
        .then(r => {
            this.componentDidMount()
        })
    }



    componentDidMount(){
        fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(eventData => {
            this.setState({
                events: eventData
            })
        })
    }


    render() {

        const event = this.state.events.map(event => 
                <Event event={event} deleteEvent={this.deleteEvent}/>
            )

        return (
            <div>

                {event}
                
            </div>
        )
    }
}
