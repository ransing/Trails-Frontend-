import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function Map() {
  const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/trails")
    .then(res => res.json())
    .then(trails => {
      setTrails(trails);
      // debugger;
      });
    console.log(trails);
  }, []);

  return (
    <GoogleMap
      defaultZoom={6}
      defaultCenter={{ lat: 38, lng: -104 }}
    >
      {trails.map(trail => (
          <Marker
            key={trail.id}
            position={{
              lat: parseFloat(trail.latitude),
              lng: parseFloat(trail.longitude)
            }}
            
          />
        )
      )}

      { selectedTrail && (
        < InfoWindow
        position={{
          lat: parseFloat(selectedTrail.latitude),
          lng: parseFloat(selectedTrail.longitude)
        }}
        onCloseClick={() => setSelectedTrail(null) }
        >
          <div>
            <h2>{selectedTrail.name}</h2>
            {/* <p>{selectedTrail.address}</p> */}
            <p>{selectedTrail.category}</p>
            <button onClick={this.props.handleClick}>See Trails</button>

          </div>

          </InfoWindow>
      )}

    </GoogleMap>
  );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
