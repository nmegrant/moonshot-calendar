import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Point,
} from "react-simple-maps";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";

interface Markers {
  markerOffset: number;
  name: string;
  coordinates: Point;
}

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

export default function MapChart() {
  let markers: Markers[] = [];
  const [points, setPoints] = useState(markers);

  //get current date
  let currentDate: string = moment().format("YYYY-MM-DD");
  let futureMonth = moment().add(3, "months").format("YYYY-MM-DD");

  useEffect(() => {
    const fetchLaunchDate = async () => {
      try {
        const response = await axios.get(
          `https://launchlibrary.net/1.3/launch/${currentDate}/${futureMonth}/?limit=100`
        );
        console.log(response.data.launches);
        markers = response.data.launches.map((l: any) => {
          return {
            markerOffset: 15,
            name: l.name,
            coordinates: [
              l.location.pads[0].longitude,
              l.location.pads[0].latitude,
            ],
          };
        });
        setPoints(markers);
      } catch (error) {
        console.log(`Error getting launch data: ${error}`);
      }
    };
    fetchLaunchDate();
  }, []);

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {points ? (
        points.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
            >
              {name}
            </text>
          </Marker>
        ))
      ) : (
        <Spinner animation="border" />
      )}
    </ComposableMap>
  );
}
