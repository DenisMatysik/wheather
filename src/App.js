import React, { useState } from "react";

const api = {
  key:"4bb7159b110111113678a5d09ef61ebf",
  base:"https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery]= useState("");
  const [weather, setWeather]= useState({});

  const search = (e)=>{
    if (e.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response => response.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result)
      });
    }
  }


  const dateBuilder =(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weather.main.temp >21 ? "app warm" : "app") : "app"}>
      <main>
        <div className="search-box">
          <input type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e)=>{setQuery(e.target.value)}}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.name != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="wheather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="wheather">{weather.weather[0].main}</div>
            </div>
          </>  
        ) : (<>
              <div className="noCity">There is no such city</div>
            </>)}
      </main>
      wheather-app
    </div>
  );
}

export default App;
