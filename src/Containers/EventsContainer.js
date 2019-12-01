import React, { Component } from 'react'
import Event from '../Components/Event';


export default class EventsContainer extends Component {

    state = {
        events: [],
        query: "",
        userId: ""
    
    }

    handleSearch = (evt) => {
        this.setState({
            query: evt.target.value
        }, () => { console.log(this.state); console.log("hi")})
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
        const sendToken = localStorage.token
        console.log("mount")
        if(sendToken){
            fetch("http://localhost:3000/profile",{
                headers: {
                    'Authorization': `Bearer ${sendToken}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                // debugger 
              console.log("mounted", data)
              this.setState({
                userId: data.id
              })
              // debugger;
            //   const obj = {'user': data, 'position': position}
            //   this.props.setUser(obj)
              
          })
        }


        fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(eventData => {
            this.setState({
                events: eventData
            })
        })

    }


    render() {


         const eventArr = this.state.events.filter(event => {
                return event.name.includes(this.state.query.toLowerCase())
            })

        const event = eventArr.map(event => 
                <Event event={event} deleteEvent={this.deleteEvent} userId={this.state.userId}/>
            )

        return (
            <React.Fragment>
                <div>
                    <input 
                        // name="query"
                        value={this.state.query}
                        placeholder="Search Event..."
                        onChange={this.handleSearch}
                        />
                </div>
                <div>
                  {event}
                </div>
            </React.Fragment>
        )
    }
}
