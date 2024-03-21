import React from "react";
import { Card } from "react-bootstrap";

const WeatherBox = ({ weather }) => {
  console.log("weather?", weather);

  return (
    <Card className="weather-box">
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
        <Card.Title>{weather?.name || "날씨를 가져오는데 실패했습니다."}</Card.Title>
        <Card.Text className="h1">
          {weather?.main?.temp.toFixed(1)}°C / {((weather?.main?.temp * 9) / 5 + 32).toFixed(1)}°F
        </Card.Text>
        <Card.Text className="h2">{weather?.weather[0].description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default WeatherBox;
