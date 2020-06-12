import React, { useState } from 'react';
const api = {
  key: "3cf542e2338a282150244318179fc6b0",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  let weatherNOw = "";



 /* const climaClassName = ()=>{ debugger;
              switch (weather.weather[0].main) {
            case 'Clouds': 
            weatherNOw = 'app clouds'
              break;
            case 'Clear': weatherNOw = 'app clear'
              break;
            case 'Snow':weatherNOw = 'app snow'
              break;
            case 'Rain':weatherNOw = 'app rain'
              break;
            default: weatherNOw = 'app'
              break;
          }
  }*/

 const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');

        });
    }
  }

  const dataBuilder =(d)=>{
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
  }


  return ( 
    <div className={(typeof weather.main != "undefined") ? `app ${weather.weather[0].main}`:'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined")? (
          <div>
            <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}, </div>
            <div className="date">{dataBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
            <div className="temp">
                {Math.round(weather.main.temp)}°c
             </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          
        </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
