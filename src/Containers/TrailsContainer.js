import React, { Component } from "react";
import Trail from "../Components/Trail";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Checkbox from '../Components/Checkbox'


const items = [
  'blue',
  'blueBlack',
  'black',
  'greenBlue',
  'dblack',
];

export default class TrailsContainer extends Component {

    state = {
        trailEvent: "",
        query: "",
        trailArr: [],
        trailAr: this.props.trailArray[0],
        visible: true,
        modalIsOpen: false,
        blue: false,
        blueBlack: false,
        black: false, 
        greenBlue: false, 
        dblack: false 

    }

    toggleAlert = () => {
      this.setState({
        visible: !this.state.visible
      })
    }
 
    handleSearch = (evt) => {
      this.setState({
          query: evt.target.value
      }, () => { console.log(this.state); console.log(this.props.trailArray[0])})
  }




  componentDidMount = ()=>{
    fetch('http://localhost:3000/trails')
    .then( r=> r.json())
    .then(trailData => {
      this.setState({
        trailArr: [...this.state.trailArr, trailData]
      })
    })
  }

  //! checkbox code 

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    this.setState({
      label: !this.state.label
    }, ()=>{console.log(label)})
    
  }

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
  }

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

    // ! checkbox code ends 



  render() {
    // console.log(this.state.trailArr[0])
    const trailArrayFull = this.props.trailArray[0];
    console.log(this.props.trailArray[0]);
    console.log(trailArrayFull)
    console.log(this.state)
    // const trailArray = this.state.trailArr[0]
    // console.log(trailArray);

    // const trailArra = this.state.trailArr[0].filter(trail => {
    //   return trail.name.includes(this.state.query.toLowerCase())
    // })
    // console.log(trailArray[0]);
    // const trailItem = trailArray.map(trail => <Trail trailItem={trail} />);


    return (

      <React.Fragment>
      <div>
      <input 
          // name="query"
          value={this.state.query}
          placeholder="Search Trail..."
          onChange={this.handleSearch}
          />
      </div>

      <div>
          {this.createCheckboxes()}
      </div>

      {/* <Checkbox/> */}



      <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px','margin-bottom': '16px' }}>
        {trailArrayFull !== undefined
          ? 
        (trailArrayFull.map(trail => {return <Trail trailItem={trail} state={this.props.state}/>}))
          : null}
          
      </div> 
      </React.Fragment>

    );
  }
}
