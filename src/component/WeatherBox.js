import React from "react";

export const WeatherBox = ({ weather }) => {
  console.log("weather?", weather);
  //   if (!weather) return <div>Loading...</div>;
  if (
    !weather ||
    !weather.main ||
    !weather.weather ||
    weather.weather.length === 0
  ) {
    return <div>Loading...</div>;
  }
  //   const fahrenheit = (Math.floor(weather?.main.temp * 1.8 + 32) * 100) / 100;
  //   const celsius = weather?.main?.temp; // 섭씨 온도
  //   const fahrenheit = celsius ? (celsius * 1.8 + 32).toFixed(2) : null;
  const celsius = weather.main.temp; // 섭씨 온도
  const fahrenheit = (celsius * 1.8 + 32).toFixed(2);
  const weatherDescription = weather.weather[0]?.description;
  console.log("");
  return (
    <div className="weather-box">
      <h1>{weather.name}</h1>
      <h2>
        {celsius.toFixed(2)}°C / {fahrenheit}°F
      </h2>
      <h3>{weatherDescription}</h3>
      {/* <h2>
        {celsius?.toFixed(2)}°C / {fahrenheit}°F
      </h2> */}
      {/* <div>{weather && weather.name}</div> */}
      {/* <h3>{weather?.weather[0]?.description}</h3> */}
      {/* <div>{weather && weather.name}</div>
      <h2>{weather && weather.main.temp}도/ 230화씨</h2>
      <h3>{weather && weather[0].description}</h3> */}
      {/* <div>{weather?.name}</div>
      <h2>
        {weather?.main.temp} 도/ {weather && fahrenheit} 화씨
      </h2>
      <h3>{weather?.weather[0].description}</h3> */}
      {/* <div>{weather.name}</div>
      <h2>
        {celsius.toFixed(2)}°C / {fahrenheit}°F
      </h2>
      <h3>{weather.weather[0].description}</h3> */}
    </div>
  );
};
