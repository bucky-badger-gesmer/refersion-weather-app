import React from "react";
import "./App.css";

function App() {
  const [currentZip, setCurrentZip] = React.useState(10036);
  const [currentCity, setCurrentCity] = React.useState(null);
  const kelvin = 273.15;

  React.useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=10036,us&appid=00ab9760d6984c9b493982a245485892"
    )
      .then((res) => res.json())
      .then((res) => {
        setCurrentCity(res);
      })
      .catch((error) => {
        throw new Error("something went wrong", error);
      });
  }, []);

  // event handlers:
  const handleZipCodeChange = (e) => {
    setCurrentZip(e.target.value);
  };

  const handleUpdateClick = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${currentZip},us&appid=00ab9760d6984c9b493982a245485892`
    )
      .then((res) => res.json())
      .then((res) => {
        setCurrentCity(res);
      })
      .catch((error) => {
        throw new Error("something went wrong", error);
      });
  };

  // render:
  const renderTop = () => {
    return (
      <div className="weather-display">
        <p id="city-name">
          {currentCity.name}
          <img
            id="weather-icon"
            src={`http://openweathermap.org/img/wn/${currentCity.weather[0].icon}.png`}
            alt="weather icon"
          />
        </p>
        <p id="weather-description">{currentCity.weather[0].main}</p>
        <p id="current-temp">
          {Math.ceil(currentCity.main.temp - kelvin) + "\u00B0"}
        </p>
        {/* <div style={{ height: "5px" }}></div> */}
        <br />
        <span id="temp-range">
          <span style={{ marginRight: "60px" }}>
            {Math.ceil(currentCity.main.temp_min - kelvin) + "\u00B0"}
          </span>
          <span>
            {Math.ceil(currentCity.main.temp_max - kelvin) + "\u00B0"}
          </span>
        </span>
      </div>
    );
  };

  const renderBottom = () => {
    return (
      <div className="zip-code-input">
        <label id="zip-code-label">Zip Code:</label>
        <br />
        <input id="input-zip" type="text" onChange={handleZipCodeChange} />
        <button
          id="update-btn"
          disabled={!/^\d+$/.test(currentZip) || currentZip.length !== 5}
          onClick={handleUpdateClick}
        >
          Update
        </button>
      </div>
    );
  };

  if (!currentCity) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {renderTop()}
      <hr />
      {renderBottom()}
    </div>
  );
}

export default App;
