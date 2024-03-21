import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherButton from "./component/WeatherButton";
import WeatherBox from "./component/WeatherBox";
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from "react-bootstrap";

// 1. 앱이 실행되자마자 현재위치기반의 날씨가 보임
// 2. 날씨정보에는 도씨, 섭씨, 화씨, 날씨상태 정보가 들어감
// 3. 5개의 버튼 필요(현재위치 버튼 1개, 다른도시 버튼 4개)
// 4. 도시버튼을 클릭할때마다 도시별 날씨가 나옴
// 5. 현재위치기반 날씨버튼을 클릭하면 다시 현재위치 기반으로 돌아와야함
// 6. 데이터를 들고오는 동안 로딩 스피너가 나옴

const cities = ["New York", "Canada", "Seoul"];
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocation = () => {
    // console.log("getCurrentLocation");

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("현재 위치", lat, lon);

      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      console.log("data", data);

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      // console.log("Data", data);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("city?", city);

    if (city == null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <Container>
      {loading ? (
        <div className="main-container">
          <ClipLoader color="#fff" loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : !apiError ? (
        <div className="main-container">
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
        </div>
      ) : (
        apiError
      )}
    </Container>
  );
}

export default App;
