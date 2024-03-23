import React from "react";
import { Button } from "react-bootstrap";

export const WeatherButton = ({ onCityChange }) => {
  const cities = ["current", "Seoul", "Paris", "New york", "London"];
  return (
    <>
      <div className="btnBoxSX">
        {cities.map((city) => (
          <Button
            key={city}
            variant="warning"
            className="btnSX"
            onClick={() => onCityChange(city)}
          >
            {city === "current" ? "Current Location" : city}
          </Button>
        ))}
        {/* <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("current")}
        >
          Current Location
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("Seoul")}
        >
          Seoul
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("Paris")}
        >
          Paris
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("New York")}
        >
          New york
        </Button>
        <Button
          variant="warning"
          className="btnSX"
          onClick={() => onCityChange("London")}
        >
          London
        </Button> */}
      </div>
    </>
  );
};
