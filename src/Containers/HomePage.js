import React, { Component } from 'react';
import Login from '../Components/Login';
import NavBar from '../Components/NavBar';
import TrailsContainer from './TrailsContainer';
import EventsContainer from './EventsContainer';
import {WrappedMap} from '../Components/Map'


export default class HomePage extends Component {


    state = {
        trails: [],
        events: [], 
        searchTerm: "",
        selectedTrail: ""
    }


    componentDidMount(){
        console.log(this.state.trails)
        fetch('http://localhost:3000/trails')
        .then(r => r.json())
        .then(trailData => {
            this.setState({
                trails: [...this.state.trails, trailData]
            })
            console.log(this.props.state)
        }
        )
    }


    render() {
        return (
            <div>
                <a> Hello </a>
                    <div style={{width: '100vw', height: '100vw'}}>
                        <WrappedMap
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
                        loadingElement={<div style={{ height: '100%'}} />}
                        containerElement={<div style={{ height: '100%'}} />}
                        mapElement={<div style={{height: '100%'}} />}
                        />
                    </div>




                <TrailsContainer trailArray={this.state.trails} state={this.props.state}/>
            </div>
        )
    }
}
