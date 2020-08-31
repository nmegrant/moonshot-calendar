import React, { useState, useEffect, MouseEvent } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Point,
} from "react-simple-maps";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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

  const [showText, setShowText] = useState(false);

  function displayInfo(event: MouseEvent) {
    event.preventDefault();
    setShowText(true);
  }

  function hideInfo(event: MouseEvent) {
    event.preventDefault();
    setShowText(false);
  }

  //get current date
  let currentDate: string = moment().format("YYYY-MM-DD");
  let futureDate = moment().add(3, "months").format("YYYY-MM-DD");

  const [selectStartDate, setSelectStartDate] = useState("");
  const [selectEndDate, setSelectEndDate] = useState("");

  useEffect(() => {
    const fetchLaunchDate = async () => {
      try {
        const response = await axios.get(
          `https://launchlibrary.net/1.3/launch/${currentDate}/${futureDate}/?limit=100`
        );
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
        alert("Problem reaching API!");
        console.log(`Error getting launch data: ${error}`);
      }
    };
    fetchLaunchDate();
  }, []);

  const submitDates = (event: MouseEvent) => {
    event.preventDefault();
    const fetchNewLaunchDate = async () => {
      try {
        if (selectStartDate !== "" && selectEndDate !== "") {
          const response = await axios.get(
            `https://launchlibrary.net/1.3/launch/${selectStartDate}/${selectEndDate}/?limit=200`
          );
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
        }
      } catch (error) {
        alert("Problem reaching API!");
        console.log(`Error getting launch data: ${error}`);
      }
    };
    fetchNewLaunchDate();
    setSelectStartDate("");
    setSelectEndDate("");
  };

  return (
    <div>
      <Form
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={selectStartDate}
            onChange={(event) => setSelectStartDate(event.target.value)}
            style={{ width: "220px" }}
          />
        </Form.Group>

        <Form.Group controlId="formEndDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={selectEndDate}
            onChange={(event) => setSelectEndDate(event.target.value)}
            style={{ width: "220px" }}
          />
        </Form.Group>
      </Form>
      <Button variant="primary" type="submit" onClick={submitDates}>
        Submit
      </Button>

      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {points ? (
          points.map(({ name, coordinates, markerOffset }, index) => (
            <Marker
              key={index}
              coordinates={coordinates}
              onMouseOver={displayInfo}
              onMouseLeave={hideInfo}
            >
              <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
              >
                {showText ? name : null}
              </text>
            </Marker>
          ))
        ) : (
          <Spinner animation="border" />
        )}
      </ComposableMap>
    </div>
  );
}
