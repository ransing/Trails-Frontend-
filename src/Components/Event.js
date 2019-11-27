import React, { Component } from 'react';
// import Button from semanitc
import moment from 'moment';

export default class Event extends Component {
    

    render() {
        // console.log(this.props.event.trail.imgMedium);



        
        return (
            
            <div>

                    <div class="container">
                    <div class="card">
                        <div class="card__image-container">
                        <img class="card__image" src={this.props.event.trail.imgMedium}  alt=""/>
                        </div>
                        
                        <svg class="card__svg" viewBox="0 0 800 500">

                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                            <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
                        </svg>
                        
                        <div class="card__content">
                        <h1 class="card__title">{null}</h1>
                        <p>{this.props.event.name}</p>

                        <br/>

                        <p> Date {this.props.event.date}</p>

                        <br/>

                        <p>Time {moment(this.props.event.time).format('hh:mm')}</p>

                        <button onClick={() => this.props.deleteEvent(this.props.event.id)}> Delete Event </button>
                        <button> Edit Event</button>

                        </div>
                    </div>
                    </div>




            </div>
            
        )
    }
}
