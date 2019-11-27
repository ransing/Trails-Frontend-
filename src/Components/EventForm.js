import React, { Component } from 'react'
import {Segment, Container, Form, Input, Button, Header, TextArea} from 'semantic-ui-react'
import '../App.css';
import Moment from 'react-moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EventForm extends Component {

    state = {
            name: "", 
            date: "",
            time: "",
            trail_id: this.props.trailId,
            category: "", 
            duration: "",
            detail: "",
            
        }
        
    handleChange = (e) => {
        // debugger
        // console.log(e.target.value)
        // console.log(this.state)
        this.setState({
            
                [e.target.name]: e.target.value
            
        })
    }

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault()
        this.props.onNewEventSubmit(this.state)
        
      }


    dateHandleChange = (date) => {
        // console.log("date", date);
        // console.log("time", time);
        this.setState({
           
         date: date
            
        }, () => console.log(this.state));
      };

    timeHandleChange = (time) => {
        // console.log("date", date);
        // console.log("time", time);
        this.setState({
       

            time: time
        
        }, () => console.log(this.state));
      };

    handleSubmit = (e) => {
        // debugger
        e.preventDefault()
        let event = this.state
        // console.log(this.state.answer)
        this.setState({
            name: "", 
            date: "",
            time: "",
            category: "", 
            duration: "",
            details: "",
        }, () =>  this.props.onNewEventSubmit(event))
       
    }

    cancelForm = () => {
        console.log("cancel");
        this.props.cancelForm()
    }

    // functions for form below 
    // const vue = new Vue({
    //     el: '#app',
    //     data: {
    //       formOpen: false,
    //       productData: {
    //         title: '',
    //         rating: '',
    //         price: '',
    //         list_price: '',
    //         is_featured: false
    //       }
    //     },
    //     methods: {
    //       resetForm: function () {
    //         this.productData = {
    //           title: '',
    //           rating: '',
    //           price: '',
    //           list_price: '',
    //           is_featured: false
    //         }
    //       },
    //       cancel: function() {
    //         this.formOpen = false;
    //         this.resetForm();
    //       }
    //     }
    //   })


    render() {

        // const [startDate, setStartDate] = useState(
        //     setHours(setMinutes(new Date(), 30), 16)



        return (
            <div>
                {/* <h3>{this.props}</h3>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Input
              fluid
              placeholder=" " 
              name="event"
              value={this.state.event}
              onChange={this.handleChange}
              required
              />
            <Form.Input
              fluid
              placeholder=" " 
              name="event"
              value={this.state.event}
              onChange={this.handleChange}
              required
              />
            <Button id="submit-button" style={{"font-family":"Special Elite", "border-radius": "50px"}} type="submit">Submit </Button>
            </Form> */}


            {/* dynamic event form begins here  */}
                <div class="container" id="app">
                    <div class="add-product" class="{'open': formOpen}">
                        <div class="button-copy" v-show="!formOpen" onClick="formOpen = true">Add Event for {this.props.addEventTrailName}</div>
                        <form onSubmit="cancel()">

                        <div class="form--field">
                            <label>Event Name  *</label>
                            <input type="text" class="form--element" name="name" v-model="productData.title" placeholder="name" required="" onChange={this.handleChange}/>
                        </div>
                        <div class="form--container -inline">
                            <div class="form--field -short">
                            <label>Event Detail *</label>
                            <input type="text" class="form--element" name="detail" v-model="productData.rating" placeholder="detail" required="" onChange={this.handleChange}/>
                            </div>
                            <div class="form--field -short">
                            <label>Event Duration *</label>
                            <span class="form--price"></span>
                            <input type="number" class="form--element" name="duration" v-model="productData.price" placeholder="duration in hours" required="" min="0" max="500" pattern="\d+(\.\d{2})?" onChange={this.handleChange}/>
                            </div>
                            <div class="form--field -short">
                            
                            <label>Event category</label>
                            <span class="form--price"></span>
                            <input type="text" class="form--element" name="category" v-model="productData.list_price" placeholder="Category" required=""  onChange={this.handleChange}/>
                            
                            <label>Date </label>
                            <span class="form--price">$</span>

                            {/* <Moment format="YYYY/MM/DD">{null}</Moment> */}

                            <DatePicker  selected={this.state.date}
                                         onChange={this.dateHandleChange} 
                                         placeholder="date"
                                      />

                            <br/>

                            <DatePicker selected={this.state.time} 
                                        onChange={this.timeHandleChange} 
                                        placeholder="time"
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="hh:mm aa"/>

                            {/* <input type="text" class="form--element" name="list_price" v-model="productData.list_price" placeholder="Category" required="" min="0" max="500" pattern="\d+(\.\d{2})?"/> */}
                            
                            {/* <label>Time</label>
                            <span class="form--price">$</span>
                            <input type="text" class="form--element" name="list_price" v-model="productData.list_price" placeholder="Category" required="" min="0" max="500" pattern="\d+(\.\d{2})?"/> */}
                            
                            <Moment format="YYYY/MM/DD">{null}</Moment>
                            
                            </div>
                            
                        </div>
                        {/* <div class="form--field">
                            <label class="emoji">
                            Is Featured
                            <input type="checkbox" name="is_featured" v-bind="productData.is_featured"/>
                            <span></span>
                            </label>
                            <p class="featured-note">If Is Featured is selected the product will appear in a large card.</p>
                        </div>
                        <div class="form--field">
                            <label>Product Description</label>
                            <textarea class="form--element textarea" v-model="productData.description" placeholder="Description">                                
                            </textarea>
                        </div> */}

                        <button type="submit" class="submit-button" onClick={(e) => this.handleSubmit(e)}>Add Event</button>
                        <div class="cancel"><span onClick={this.cancelForm}>Cancel</span></div>
                        </form>
                    </div>
                    </div>


            {/* dynamic event form ends here  */}




            
            </div>
        )
   
    }
}
