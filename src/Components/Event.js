import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
// import Button from semanitc
import moment from 'moment';
import EventComments from './EventComments';
// import {ActionCable} from 'react-actioncable-provider';
import {ActionCableConsumer} from 'react-actioncable-provider';
import posed from "react-pose";
import ZoomImg from './ZoomImg';
import '../Styles/ZoomStyle.css';

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {VictoryChart, VictoryArea, VictoryTheme, VictoryLabel, VictoryLine} from 'victory';

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
  };


export default class Event extends Component {

    state ={
        weather: {
            hourly: {
                data: []
            }
        },
        hover: false,
        modalIsOpen: false,
        isZoomed: false 

    }

    //animation transition
    zoomIn() {
        this.setState({ isZoomed: true });
      }
      
    zoomOut() {
        this.setState({ isZoomed: false });
    }


    alertCreate = () => {
        alert("added to your events")
    }

    toggleModal = () => {
        
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    attendEvent = () => {
        console.log("attend")
        fetch("http://trailsbackend1.herokuapp.com/user_events",{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.token}`
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

            // console.log(r);
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

    // toggleHover = () => {
    //     this.setState({
    //         hover: !this.state.hover
    //     })
    // }
    

    componentDidMount = () => {
        // this.setState({hover: !this.state.hover})
        const weatherDate = moment(this.props.event.date).format('YYYY-MM-DD')
        const t = "T"
        const weatherDateT = weatherDate.concat(t)
        const weatherTime = moment(this.props.event.time).format('hh:mm:ss')
        const timeDarkSky = weatherDateT.concat(weatherTime)
        // console.log(timeDarkSky)
        fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_WEATHER_API_KEY}/${this.props.event.trail.latitude},${this.props.event.trail.longitude},${timeDarkSky}`, {
            
        })
        .then(r => r.json())
        .then ( r => {
            this.setState({
                weatherSummary: r.hourly.summary,
                icon: r.hourly.icon,
                weather: r
            })
          
        })
        
        } 
    
        // handleReceivedChat =() => {
        //     this.setState(prevState => {
        //         return{

        //         }
        //     })
        // }
            
    
    render() {
        // console.log(this.props.event.trail.imgMedium);
        // console.log(this.state.weather.hourly.data)
            


        const delButton = this.props.event.event_users_id_array.includes(this.props.userId) ?
                        (<div><button onClick={() => this.props.deleteEvent(this.props.event.id)}> Delete this event </button>
                        <button className="eventButton" onClick={this.editEvent}> Edit Event</button>  </div>) :
                        null


        const attendEvent = this.props.event.event_users_id_array.includes(this.props.userId) ?
                            null :
                        (<button className="eventButton" onClick={this.attendEvent}> Attend this event </button>) 


        // const transformArray = eventData.map(({ name, date, event_trail}) => ({ title: name,
        //                                                                         start: date,                 url: event_trail }))

        const tempArray =  this.state.weather.hourly.data.map((
            {time,temperature}) => ({x:moment.unix(parseInt(time)).format('hh a'), y:temperature}
        ))                     
        
        // console.log(tempArray)


        
        return (

            <React.Fragment>
                <Provider template={AlertTemplate} {...options}>
            {/* <ActionCableConsumer channel={{channel: 'FeedChannel'}} onReceived={() => {
                console.log("received");
            }}/> */}

            {/* <ActionCableConsumer
              
              channel={ {channel: 'EventsChannel'} }
              onReceived={handleReceivedChat}  /> */}

            {/**  modal weather  begins */}

            <Modal isOpen={this.state.modalIsOpen}>
            <ModalHeader onClick={this.toggleModal}> Header </ModalHeader>

            <ModalBody>
                <a href={this.toggleModal}>{null}</a>
                <li>Summary: {this.state.weather.hourly.summary} </li>
                <li>Condition Status: {null} </li>
                <li>Condition Details: {null} </li>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        >
                        <VictoryArea
                            style={{ data: { fill: "#c43a31" } }}
                            data={tempArray}
                        />
                        {/* <VictoryLabel x={25} y={55} style={styles.labelOne}
                                    text={"Economy \n % change on a year earlier"}
                                /> */}
                        <VictoryChart domain={[0, 10]}>
                            <VictoryLabel text="← 12AM -12PM- 12AM →" x={60} y={339} />
                                {/* <VictoryLine
                                    style={{ data: { stroke: "blue", strokeWidth: 5 } }}
                                    y={(d) => d.x}
                            /> */}
                            <VictoryLabel text="Temperature in ° C" datum={{ x: 3, y: 27 }} textAnchor="middle"/>
                        </VictoryChart>
                    </VictoryChart>
               
            </ModalBody>

            <ModalFooter> Close </ModalFooter>

            </Modal>
            
            {/* modal weather  ends   */}

            <div>

                    <div class="container">
                    <div class="card">
                        <div class="card__image-container">
                        {/* <img class="card__image" src={this.props.event.trail.imgMedium}  alt=""/> */}
                        <ZoomImg 
                            imageWidth={330}
                            imageHeight={250}
                            src={this.props.event.trail.imgMedium}
                        />
                        </div>
                        
                        {/* <svg class="card__svg" viewBox="0 0 800 500">

                            <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500" stroke="transparent" fill="#333"/>
                            <path class="card__line" d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400" stroke="pink" stroke-width="3" fill="transparent"/>
                        </svg> */}
                        
                        <div class="card__content">
                        <h1 class="card__title">{null}</h1>
                        <p style={{"font-size":"30px", "font-weight":"bold"}}>{this.props.event.name}</p>
                        
                        <a href={this.props.event.trail.url} target="_blank"> Trail: {this.props.event.trail.name}</a>

                        
                        {attendEvent}
                        {/* <button onClick={this.attendEvent}> Attend Event</button> */}

                        <br/>

                        <p style={{"color":"black"}}> Date {moment(this.props.event.date).format('dddd')} {this.props.event.date} -
                        Time {moment(this.props.event.time).format('hh:mm')}</p>

                        <button className="weatherButton" onClick={this.toggleModal}> Check the Weather</button>

                        <p style={{"color":"black"}} onMouseEnter={this.toggleHover} > {null} Weather: {this.state.weatherSummary} </p>

                        <br/>

                        
                        {delButton}

                        {/* <button onClick={() => this.props.deleteEvent(this.props.event.id)}> Delete Event </button> */}
                        

                        </div>

                        <EventComments event={this.props.event} userId={this.props.userId} userName={this.props.userName}/>

                    </div>
                    </div>




            </div>
            </Provider>
            </React.Fragment>
            
        )
    }
}
