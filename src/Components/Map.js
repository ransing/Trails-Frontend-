import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

function Map(props) {
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

  const mapOnClick = (trail) => {
    console.log(trail)
    setSelectedTrail(trail)
  }

  return (

    <div style={{ "height": "20", "width": "20" }}>
    <GoogleMap
      // style={{ height: '100vh', width: '100%' }}
      // width="120" 
      // height="120"
      defaultZoom={7}
      defaultCenter={{ lat: 38, lng: -104 }}
    >
      
      {trails.map(trail => (
          <Marker
            onClick ={() => mapOnClick(trail)}
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
            <button onClick={()=> props.handleClick(selectedTrail)}>See Trails</button>

          </div>

          </InfoWindow>
      )}

    </GoogleMap>
    </div>
  );
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));
