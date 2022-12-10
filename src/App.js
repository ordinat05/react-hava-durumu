import React, { useState, useEffect } from "react";
import "./App.css";
import { usePosition } from "use-position";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();
  // console.log(latitude);
  // console.log(longitude);
  // console.log(weather);
  const getWeatherData = async (lat, lon) => {
    const key = process.env.REACT_APP_WEATHER_DATA;
    const lang = navigator.language.split("-")[0];
    console.log("navigator detayları -->", lang);

    // console.log("Burada 1 : ", lat, "Burada 2 : ", lon);
    // console.log("Burada KEY :", key);

    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}`
      );
      setWeather(data);
      alert("Veriler Çekildi");
      console.log("data detayları -->", data);
      console.log("weather detayları -->", weather);
    } catch {
      alert("Veriler Çekilemedi");
    }
  };
  useEffect(() => {
    latitude && longitude && getWeatherData(latitude, longitude);
    // eslint-disable-next-line
    // console.log(
    //   "Burada useEffect 1 : ",
    //   latitude,
    //   "Burada useEffect 2 : ",
    //   longitude
    // );
  }, [latitude, longitude]);
  // 🔑🔑🔑 Benim Problem Burada. [latitude, longitude] değişikliği takip edilirken, elde edilen lat ve lon değerleri, getWeatherData içine gönderilememiş oluyor.
  return (
    <div className="App">
      <h2>Hava Durumu</h2>
      <h3>Enlem Koordinat : {latitude}</h3>
      <h3>Boylam Koordinat : {longitude}</h3>
      <h3>Koordinat Bölgesi : {weather.name}</h3>
      <h3>
        Hava Sıcaklığı : {Math.ceil(weather.main.temp - 273.15)}
        <span>&deg;C</span>{" "}
      </h3>
      <h3>Durumu : {weather.weather.map((data) => data.main)} </h3>
      <h3>Özelliği : {weather.weather.map((data) => data.description)}</h3>
      <h3>parseFloat(parseFloat("1.7777777").toFixed(2))</h3>
    </div>
  );
}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 🔺 Sorgu şablonu
// 41.0124288
// 🔺 Enlem bilgimiz
// 28.803072
// 🔺 Boylam bilgimiz
// fc135d38a08e9ae3746f5f99440fb107
// 🔺  API key imiz
// https://api.openweathermap.org/data/2.5/weather?lat=41.0124288&lon=28.803072&appid=fc135d38a08e9ae3746f5f99440fb107
// 🔺  Birleştirilmiş hali. TEST.
export default App;
