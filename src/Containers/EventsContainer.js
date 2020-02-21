import React, { Component } from 'react'
import Event from '../Components/Event';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
// import { Checkbox } from 'semantic-ui-react';
import Checkbox from '../Components/Checkbox';
import EventCalendar from '../Components/EventCalendar'


const items = [
    'My Events'
]

export default class EventsContainer extends Component {

    state = {
        events: [],
        query: "",
        userId: "",
        userName: "",
        myEvent: false 
    
    }

    handleSearch = (evt) => {
        this.setState({
            query: evt.target.value
        }, () => { console.log(this.state); console.log("hi")})
    }

    deleteEvent = (e) =>{
        console.log(e);
        fetch(`http://febbackend.herokuapp.com/${e}`, {
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
            fetch("http://febbackend.herokuapp.com/profile",{
                headers: {
                    'Authorization': `Bearer ${sendToken}`
                }
            })
            .then(resp => resp.json())
            .then(data => {
                // debugger 
              console.log("mounted", data)
              this.setState({
                userId: data.id,
                userName: data.username
              })
              // debugger;
            //   const obj = {'user': data, 'position': position}
            //   this.props.setUser(obj)
              
          })
        }


        fetch('http://febbackend.herokuapp.com/events')
        .then(r => r.json())
        .then(eventData => {
            // debugger
            this.setState({
                events: eventData
            })
        })

    }

    //!checkbox begins 

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

    toggleCheckbox = label => {
        console.log(this.state.userId);
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
        this.setState({
            myEvent: !this.state.myEvent
        })
        console.log("check");
      }
    
    //   handleFormSubmit = formSubmitEvent => {
    //     formSubmitEvent.preventDefault();
    
    //     for (const checkbox of this.selectedCheckboxes) {
    //       console.log(checkbox, 'is selected.');
    //     }
    //   }
    
      createCheckbox = label => (
        <Checkbox
          label={label}
          handleCheckboxChange={this.toggleCheckbox}
          key={label}
        />
      )
    
      createCheckboxes = () => (
        items.map(this.createCheckbox)
      )
    

    //!checkbox ends 


    render() {


         const eventArr = this.state.events.filter(event => {
                return event.name.toLowerCase().includes(this.state.query.toLowerCase())
            })
            // debugger
            
            
            const finalArr = 
            this.state.myEvent === true ?
            eventArr.filter(event => {
                return event.create_users_id_array.includes(this.state.userId)
            })
            : 
            eventArr.sort(function(a,b){
                return b.id - a.id
            })
            
            console.log(finalArr)

        const event = finalArr.map(event => 
                <Event event={event} deleteEvent={this.deleteEvent} userId={this.state.userId} userName={this.state.userName}/>
            )

        

        return (
            <React.Fragment >
                <div style={{"margin-top":"68px"}}>
                    {/* <input 
                        // name="query"
                        value={this.state.query}
                        placeholder="Search Event..."
                        onChange={this.handleSearch}
                        /> */}
                </div>
                <a href="http://localhost:3001/events#bottom"> Go to Calendar</a>
                <div>
                    {this.createCheckboxes()}
                </div>
                
                <div style={{"margin-top":"0px"}}>
                    <input 
                        // name="query"
                        value={this.state.query}
                        placeholder="Search Event..."
                        onChange={this.handleSearch}
                        />
                </div>
                <div style={{"margin-top":"18px"}}>
                  {event}
                </div>

                <EventCalendar events={this.state.events}/>
            </React.Fragment>
        )
    }
}
