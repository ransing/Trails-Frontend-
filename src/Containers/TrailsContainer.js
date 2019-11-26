import React, { Component } from "react";
import Trail from "../Components/Trail";

export default class TrailsContainer extends Component {
  render() {
    const trailArray = this.props.trailArray;
    console.log(trailArray[0]);
    // const trailItem = trailArray.map(trail => <Trail trailItem={trail} />);
    return (
      <div style={{'display': 'flex', 'flex-direction': 'row', 'flex-wrap': 'wrap', 'justify-content': 'space-around', 'align-items': 'space-around', 'height': '100%', 'margin-top': '16px','margin-bottom': '16px' }}>
        {trailArray[0] !== undefined
          ? trailArray[0].map(trail => <Trail trailItem={trail} />)
          : null}
      </div>
    );
  }
}
