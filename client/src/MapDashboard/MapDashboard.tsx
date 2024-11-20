/* eslint-disable */
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LngLat, LngLatBounds } from 'mapbox-gl';
import addresses from '../DummyData/final_merged_df.json';
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { add } from 'winston';
import ToggleMapButton from '../components/buttons/ToggleMapButton';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZGhydXZndXAiLCJhIjoiY20yZjRoaHF1MDU3ZTJvcHFydGNoemR3bSJ9.IQmyIaXEYPl2NWrZ7hHJxQ',
});
// mapboxAccessToken="sk.eyJ1IjoiZGhydXZndXAiLCJhIjoiY20yZjRycWQ4MDVjaTJsb283azNpY2NtbyJ9._03wsEghyp5zca-e7RTexg"

interface Address {
  Agency: string;
  Address: string;
  City: string;
  State: string;
  ZIP_Code: string;
}

interface Coordinate {
  lng: number;
  lat: number;
  Agency: string;
}

interface MapDashboardProps {
  addressList: Address[];
}

function MapDashboard(props: MapDashboardProps) {
  const addressList = props.addressList;
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [layerToggle, setLayerToggle] = useState<boolean>(false);
  // Function to fetch coordinates for each address
  const fetchCoordinates = async (address: Address) => {
    const apistring = address.Address + ' ' + address.City;
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?address_line1=${address.Address}&place=${address.City}&access_token=pk.eyJ1IjoiZGhydXZndXAiLCJhIjoiY20yZjRoaHF1MDU3ZTJvcHFydGNoemR3bSJ9.IQmyIaXEYPl2NWrZ7hHJxQ`,
    );
    const data = await response.json();
    const [lat, lng] = data.features[0].geometry.coordinates; // Get the first match
    return { lng, lat, Agency: address.Agency };
  };

  useEffect(() => {
    const getCoordinates = async () => {
      const coords = await Promise.all(addressList.map(fetchCoordinates));
      setCoordinates(coords);
    };

    getCoordinates();
  }, [addressList]);

  let currentLayerHtml: React.ReactNode = coordinates.map((marker, index) => (
    <Marker key={index} coordinates={[marker.lat, marker.lng]}>
      <div
        style={{
          backgroundColor: 'red',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
        }}
      />

      <div
        style={{
          color: 'black',
          backgroundColor: 'white',
          padding: '2px 5px',
          borderRadius: '3px',
          fontSize: '12px',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        {' '}
        {marker.Agency}
      </div>
    </Marker>
  ));
  if (layerToggle) {
    currentLayerHtml = <p>Hello</p>;
  }
  return (
    <>
      <Map
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v9"
        maxBounds={[
          [-74.7, 39.2],
          [-73.894883, 40.5],
        ]}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <ToggleMapButton
          setLayerToggle={setLayerToggle}
          toggled={layerToggle}
        />

        {currentLayerHtml}
      </Map>
    </>
  );
}

export default MapDashboard;
