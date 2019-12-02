import React, { Component } from 'react';
// import Button from semanitc
import moment from 'moment';
import EventComments from './EventComments'

export default class Event extends Component {


    alertCreate = () => {
        alert("added to your events")
    }

    attendEvent = () => {
        console.log("attend")
        fetch("http://localhost:3000/user_events",{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                'Authorization': localStorage.token
            },
            body: JSON.stringify({
                user_events: {
                    event_id: this.props.event.id
                }
            })
        })
        .then(r => r.json())
        .then( r => {
            this.alertCreate()

            console.log(r);
        })
    }


    editEvent = () => {
        console.log(this.props.userId, this.props.event.event_users_id_array, this.props.event.create_events.id);
        if (this.props.event.event_users_id_array.includes(this.props.event.create_events.id)) 
        return true 
        else
        return false
                    //    ( console.log("terninary")) :
                    //     null
    }


    

    render() {
        // console.log(this.props.event.trail.imgMedium);


        const delButton = this.props.event.event_users_id_array.includes(this.props.userId) ?
                        (<button onClick={() => this.props.deleteEvent(this.props.event.id)}> Delete this event </button>) :
                        null


        
        return (
            
            <div>

                    <div class="container">
                    <div class="card">
                        <div class="card__image-container">
                        <img class="card__image" src={this.props.event.trail.imgMedium}  alt=""/>
                        </div>
                        
                        {/* <svg class="card__svg" viewBox="0 0 800 500">

                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                            <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
                        </svg> */}
                        
                        <div class="card__content">
                        <h1 class="card__title">{null}</h1>
                        <p>{this.props.event.name}</p>
                        <br/>
                        <p> Trail: {this.props.event.trail.name}</p>

                        <br/>

                        <button onClick={this.attendEvent}> Attend Event</button>

                        <br/>

                        <p> Date {moment(this.props.event.date).format('dddd')} {this.props.event.date} </p>

                        <br/>

                        <p>Time {moment(this.props.event.time).format('hh:mm')}</p>
                        
                        {delButton}

                        <button onClick={() => this.props.deleteEvent(this.props.event.id)}> Delete Event </button>
                        <button onClick={this.editEvent}> Edit Event</button>

                        </div>

                        <EventComments event={this.props.event} userId={this.props.userId}/>

                    </div>
                    </div>




            </div>
            
        )
    }
}
