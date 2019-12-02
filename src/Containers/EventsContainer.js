import React, { Component } from 'react'
import Event from '../Components/Event';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
// import { Checkbox } from 'semantic-ui-react';
import Checkbox from '../Components/Checkbox'

const items = [
    'My events'
]

export default class EventsContainer extends Component {

    state = {
        events: [],
        query: "",
        userId: "",
        myEvent: false 
    
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
        console.log("chec");
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
                return event.name.includes(this.state.query.toLowerCase())
            })
            // debugger
        console.log(this.state.events)


        const finalArr = 
                this.state.myEvent === true ?
                eventArr.filter(event => {
                return event.create_users_id_array.includes(this.state.userId)
            })
            : 
            eventArr

        const event = finalArr.map(event => 
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
                    {this.createCheckboxes()}
                </div>
                <div>
                  {event}
                </div>
            </React.Fragment>
        )
    }
}
