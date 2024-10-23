/* eslint-disable */
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LngLat, LngLatBounds} from 'mapbox-gl';

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
        maxBounds = {[
          [-74.700000, 39.200000],
          [-73.894883, 40.500000],
        ]}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
      </Map>
    </>
  );
}

export default MapDashboard;
