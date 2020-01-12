import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ScrollUpButton from "react-scroll-up-button";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "../App.css";

// must manually import the stylesheets for each plugin
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";



export default class EventCalendar extends React.Component {
  calendarComponentRef = React.createRef();


  state = {
    events: [],
    calendarWeekends: true,
    calendarEvents: []
    };


  componentDidMount(){
    fetch('http://localhost:3000/events')
        .then(r => r.json())
        .then(eventData => {
            // debugger
            const transformArray = eventData.map(({ name, date, event_trail}) => ({ title: name, start: date, url: event_trail }))


        
            this.setState({
                calendarEvents: transformArray
            })
        })
    // debugger
    // const eventArray = this.state.events
    // const resultArray = this.state.events.map(elm => ({
    //     title: elm.name,
    //     start: elm.date
    // }))
    // const transformArray = this.state.events.map(({ name, date}) => ({ details: name, start: date }))

    // // debugger
    // this.setState({
    //     calendarEvents: transformArray
    // })
  }

  handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr)
  }

  
  

  render() {
      // console.log(this.state.calendarEvents)
      // console.log(this.state.events)
      const transformArray = this.state.events.map(({ name, date, event_trail }) => ({ details: name, start: date, url: event_trail }))
      // console.log(transformArray)

    return (
        <div className="demo-app">
        <ScrollUpButton style={{width: 75}} ToggledStyle={{right: 100}}/>
          <a href="http://localhost:3001/events"> Go to Top</a>
        <div id="bottom" className="demo-app-top">
          <button onClick={this.toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={this.gotoPast}>go to a date in the past</button>
          &nbsp; 
        </div>
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin,  ]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            target="_blank"
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

//   handleDateClick = arg => {
//     if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
//       this.setState({
//         // add new event data
//         calendarEvents: this.state.calendarEvents.concat({
//           // creates a new array
//           title: "New Event",
//           start: arg.date,
//           allDay: arg.allDay
//         })
//       });
//     }
//   };
}
