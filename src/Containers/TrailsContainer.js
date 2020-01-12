import React, { Component } from "react";
import Trail from "../Components/Trail";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Checkbox from "../Components/Checkbox";
import { useAlert, withAlert } from "react-alert";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ReactSearchBox from 'react-search-box';


const items = ["veryEasy", "easy", "medium", "hard", "veryHard"];
const options = {
  timeout: 3000,
  position: positions.BOTTOM_CENTER
};

class TrailsContainer extends Component {
  state = {
    trailEvent: "",
    query: "",
    trailArr: [],
    // trailAr: this.props.trailArray[0],
    visible: true,
    modalIsOpen: false,
    veryEasy: false,
    medium: false,
    hard: false,
    easy: false,
    veryHard: false,
    colorChosen: ["blue", "green"]
    // oneColorChose: 'blue'
  };

  toggleAlert = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  handleSearch = evt => {
    this.setState(
      {
        query: evt.target.value
      },
      () => {
        console.log(this.state);
        console.log(this.props.trailArray[0]);
      }
    );
  };

  componentDidMount = () => {
    fetch("http://localhost:3000/trails")
      .then(r => r.json())
      .then(trailData => {
        this.setState({
          trailArr: trailData
        });
      });
  };

  justForAlert = () => {
    console.log(this.props.alert);
    // const alert = this.props.alert;
    // alert.show("new favorite");
  };

  //! checkbox code

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    console.log(label);
    this.setState(
      {
        [label]: !this.state[label]
      },
      () => console.log(this.state)
    );
    // if (this.selectedCheckboxes.has(label)) {
    //   this.selectedCheckboxes.delete(label);
    // } else {
    //   this.selectedCheckboxes.add(label);
    // }
    // this.setState(
    //   {
    //     [label]: !this.state[label]
    //   },
    //   () => {
    //     console.log(this.state.veryEasy, label);
    //   }
    // );
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, "is selected.");
    }
  };

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  );

  createCheckboxes = () => items.map(this.createCheckbox);

  // ! checkbox code ends

  forceTrail = r => {
    // this.forceUpdate()
    console.log("helloooooo", r);
    const copyArray = [...this.state.trailArr];
    const newArray = copyArray.map(trail => {
      if (trail.id === r.trail.id) {
        return { ...trail, user_trails: [...trail.user_trails, r] };
      } else {
        return trail;
      }
    });
    this.setState({
      trailArr: newArray
    });
    console.log("sent update props");
    // fetch("http://localhost:3000/trails")
    //   .then(r => r.json())
    //   .then(trailData => {
    //     this.setState({
    //       trailArr: trailData
    //     });
    //   });
  };

  forceTrailDelete = e => {
    console.log(e);
    const tempArray = [...this.state.trailArr];
    const newTempArray = tempArray.map(trail => {
      if (trail.id === e) {
        return { ...trail, user_trails: [] };
      } else {
        return trail;
      }
    });
    this.setState({
      trailArr: newTempArray
    });
  };

  render() {
    // console.log(this.state.trailArr[0])
    const trailArrayFull = this.state.trailArr;
    // console.log(this.props.trailArray[0]);
    // console.log(trailArrayFull);
    // console.log(this.state.trailArr);
    // const trailArray = this.state.trailArr[0]
    // console.log(trailArray);

    const blue = this.state.veryEasy
      ? trailArrayFull.filter(trail => {
          return trail.difficulty === "blue";
        })
      : [];

    const blueBlack = this.state.medium
      ? trailArrayFull.filter(trail => {
          return trail.difficulty === "blueBlack";
        })
      : [];
    const black = this.state.hard
      ? trailArrayFull.filter(trail => {
          return trail.difficulty === "black";
        })
      : [];
    const greenBlue = this.state.easy
      ? trailArrayFull.filter(trail => {
          return trail.difficulty === "greenBlue";
        })
      : [];
    const dblack = this.state.veryHard
      ? trailArrayFull.filter(trail => {
          return trail.difficulty === "dblack";
        })
      : [];

    // // const colorTrailFilter = trailArr ? trailArr.filter

    const sumArr =
      this.state.veryEasy ||
      this.state.medium ||
      this.state.hard ||
      this.state.easy ||
      this.state.veryHard
        ? [...blue, ...blueBlack, ...black, ...greenBlue, ...dblack]
        : trailArrayFull;

    const trailArr = sumArr
      ? sumArr.filter(trail => {
          return trail.name
            .toLowerCase()
            .includes(this.state.query.toLowerCase());
        })
      : null;

    // console.log(trailArray[0]);
    // const trailItem = trailArray.map(trail => <Trail trailItem={trail} />);

    return (
      <React.Fragment>
        <div className="pure-control-group" 
         >
          <input
          style={{"margin-top": "68px" }}
            // name="query"
            value={this.state.query}
            placeholder="Search Trail..."
            onChange={this.handleSearch}
          />
        </div>
          {/* <ReactSearchBox
            placeholder="Placeholder"
            inputBoxFontSize="20"
            inputBoxHeight="20"
            inputBoxWidth ="20"
            inputBoxFontColor ="white"
            value="Doe"
            data={this.data}
            callback={record => console.log(record)}
          /> */}

        <div style={{ "display": "flex", "flex-direction": "row", "margin-top": "28px" }}>
          Sort by Difficulty: {this.createCheckboxes()}
        </div>

        {/* <Checkbox/> */}

        <div
          style={{
            display: "flex",
            "flex-direction": "row",
            "flex-wrap": "wrap",
            "justify-content": "space-around",
            "align-items": "space-around",
            height: "100%",
            "margin-top": "16px",
            "margin-bottom": "16px"
          }}
        >
          {trailArr
            ? trailArr.map(trail => {
                return (
                  <Trail
                    key={trail.id}
                    trailItem={trail}
                    state={this.props.state}
                    forceTrail={this.forceTrail}
                    forceTrailDelete={this.forceTrailDelete}
                    justForAlert={this.justForAlert}
                  />
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}

export default TrailsContainer;
