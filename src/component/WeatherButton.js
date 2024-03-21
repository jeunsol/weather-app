import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  console.log("cities?", cities);

  return (
    <div className="menu-container">
      <Button
        variant={selectedCity == null ? "primary" : "outline-primary"}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city, index) => (
        <Button
          key={index}
          variant={selectedCity == city ? "primary" : "outline-primary"}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
