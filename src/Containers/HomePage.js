import React, { Component } from 'react';
import Login from '../Components/Login';
import NavBar from '../Components/NavBar';
import TrailsContainer from './TrailsContainer';
import EventsContainer from './EventsContainer'


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
            console.log(this.state.trails)
        }
        )
    }


    render() {
        return (
            <div>
                <a> Hello </a>
                <TrailsContainer trailArray={this.state.trails}/>
            </div>
        )
    }
}
