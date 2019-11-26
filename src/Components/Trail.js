import React, { Component } from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import EventForm from './EventForm'

export default class Trail extends Component {


    addEvent = () => {
        console.log("click")
    }

  render() {
    // console.log(this.props.trailItem);
    return (

    <React.Fragment>
        <div>
           
            
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
                        backgroundColor: '#41669d',
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
