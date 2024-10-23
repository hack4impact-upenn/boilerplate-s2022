import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGhydXZndXAiLCJhIjoiY20yZjRoaHF1MDU3ZTJvcHFydGNoemR3bSJ9.IQmyIaXEYPl2NWrZ7hHJxQ',
});
// mapboxAccessToken="sk.eyJ1IjoiZGhydXZndXAiLCJhIjoiY20yZjRycWQ4MDVjaTJsb283azNpY2NtbyJ9._03wsEghyp5zca-e7RTexg"

function MapDashboard() {
  return (
    <>
      hi
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    </>
  );
}

export default MapDashboard;
