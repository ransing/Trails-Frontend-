import React, { Component } from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import EventForm from './EventForm';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';
import StarRatings from 'react-star-ratings';
import Chart from 'chart.js';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {Button} from 'antd';
import '../Styles/Trail.css';
// import {Button} from 'antd/es/button';
// import 'antd/dist/antd.css';
export default class Trail extends Component {

    state = {
        addEventTrail: "",
        addEventTrailName: "",
        token: localStorage.token,
        visible: true,
        modalIsOpen: false,
        favTrail: false
    }

    toggleAlert = () => {
        this.setState({
          visible: !this.state.visible
        })
      }

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    componentDidMount(){
        // console.log(this.props.state)
        fetch('http://localhost:3000/user_trails',{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                'Authorization': localStorage.token
            },
        })
        .then(r => r.json())
        .then(r => {
            // console.log(r)
        })

    }

    componentDidUpdate(){
       
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

    alertFavorite = () => {
        alert.show("added to your favorite")
    }

    changeState = () => {
       this.setState({
           favTrail: !this.state.favTrail
       })
    }


    addFavorite = (event) => {
        fetch("http://localhost:3000/user_trails", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                user_trail: {
                    trail_id:this.props.trailItem.id 
                }
            })
        })
        .then(r => r.json())
        .then(r => {
            
            this.alertFavorite()
            this.changeState()
            this.props.forceTrail(r)
                }
        )
        
        
    }


    onNewEventSubmit = (event) => {
        // e.preventDefault()
        console.log(event)
        fetch("http://localhost:3000/events", {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'Application/json',
                "Authorization": `Bearer ${localStorage.token}`
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

    removeFavorite = (e) => {
        const userTrailId = this.props.trailItem.user_trails.map(userTrail => userTrail.id)
        fetch(`http://localhost:3000/user_trails/${userTrailId[0]}`, {
                'method': 'DELETE'
        })
        .then(r => {
            this.changeState()
            this.componentDidMount()
            this.props.forceTrailDelete(e)
        })
        
    }

    
    render() {
        const trailData = this.props.trailItem
        const data = [{stars: this.props.trailItem.stars,
                        length:  this.props.trailItem.length,
                        ascent: this.props.trailItem.ascent,
                        descent: this.props.trailItem.descent, 
                        high: this.props.trailItem.high,
                        low: this.props.trailItem.low,
                        y: 100
                    }]
    // console.log(this.props.trailItem);

        const vic = <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={{ x: 10 }}
                        >
                            <VictoryBar horizontal
                                style={{
                                data: { fill: "#c43a31" }
                                    }}
                                height={20}
                                data={data}
                                x="length"
                                y = "y"
                            />
                                <VictoryAxis
                                    height={20}
                                    domain={[-10, 10]}
                                    label="experiment"
                                    style={{
                                        axisLabel: { padding: 30 }
                                    }}
                                    />
                                <VictoryAxis dependentAxis
                                    label="Length"
                                    style={{
                                        axisLabel: { padding: 40 }
                                    }}
                                    />
                    </VictoryChart>

    const chartData = {
                        labels: ['Ascent', 'Descent', 'High', 'Low'],
                        datasets:[
                            {
                                label:'',
                                data:[
                                     this.props.trailItem.ascent,
                                    this.props.trailItem.descent, 
                                    this.props.trailItem.high,
                                    this.props.trailItem.low
                                ],
                                options: {
                                    animation: {
                                        duration: 2500,
                                        easing: 'easeInExpo'
                                        
                                    }
                                },
                                backgroundColor:[
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                ]
                            }
                            ]
                        }
    
    // Chart.defaults.global = {
    //     animation: true,
        // animationSteps: 160,
        // duration: 5000
    // }

    const chartJs =  <Bar
                            data={chartData}
                            options={{
                            title:{
                                display:true,
                                text:'elevation',
                                fontSize:25
                            },
                            legend:{
                                display:false,
                                position: 'bottom'
                            }
                            }}
                        />

    //ternary for favorite button 
    const favorite = this.props.trailItem.user_trails.length > 0  ?
                <button type="primary" className="button-small button-error pure-button pure-button-primary"  onClick={() => this.removeFavorite(this.props.trailItem.id)}> Remove Favorite </button>  :
                    <button type="primary" className="button-small button-error pure-button pure-button-primary" onClick={this.addFavorite}> Add Favorite </button> 


    return (

    <React.Fragment>


        <Modal isOpen={this.state.modalIsOpen}>
            <ModalHeader onClick={this.toggleModal}> Header </ModalHeader>

            <ModalBody>
                <li>{this.props.trailItem.name}</li>
                <li>Summary: {this.props.trailItem.summary} </li>
                <li>Condition Status: {this.props.trailItem.condition} </li>
                <li>Condition Details: {this.props.trailItem.conditionDetails} </li>
                {vic}
                {chartJs}
            </ModalBody>

            <ModalFooter> Add event </ModalFooter>

        </Modal>

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
                    style={{ width: '250px', height: '250px', "margin-bottom":"16px" }} /// these are optional style, it is not necessary
                >

            <FrontSide
                    style={{
                        backgroundColor: 'A4A378',
                    }}
                >
                            <StarRatings
                                starDimension="10px"
                                starSpacing="5px"
                                rating={this.props.trailItem.stars}
                                starRatedColor="red"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                                />
                            <div> Votes: {this.props.trailItem.star_votes} </div>
                    <div  style={{"font-size":"17px"}}>
                    {this.props.trailItem.name}
                    </div>
                    <button type="primary" className ="pure-button-primary pure-button button-stats button-small" onClick={this.toggleModal}> Stats </button>
                    <img src={`${this.props.trailItem.imgSmall}`} style={{"max-width": "100%", "max-height": "90%"}}></img>
            </FrontSide>

            <div className="App">

            <BackSide
                    style={{ backgroundColor: '#175852'}}>
                    <img src={`${this.props.trailItem.imgMedium}`} style={{"max-width": "100%", "max-height": "100%"}}></img>
                    <button type="primary" className="button-small pure-button pure-button-primary" onClick={this.addEvent}> Add Event </button>


                    {favorite}
            </BackSide>
            </div>
            </Flippy>

    </React.Fragment>   
    )
  }
}
