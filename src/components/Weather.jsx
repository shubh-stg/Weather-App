import styles from "./Weather.module.css";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

import { FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from "react-icons/wi";

function Weather() {
  const [weatherdata, setweatherdata] = useState(false);
  const inpref = useRef();
  const search = async (city) => {
    if (city === "") {
      alert("Enter a valid city name ");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);

      const getWeatherIcon = (condition) => {
        const iconMap = {
          Clear: <WiDaySunny size={150} color="gold" />,
          Clouds: <WiCloud size={150} color="gray" />,
          Rain: <WiRain size={150} color="blue" />,
          Thunderstorm: <WiThunderstorm size={150} color="purple" />,
          Snow: <WiSnow size={150} color="lightblue" />,
          Fog: <WiFog size={150} color="gray" />,
        };

        return iconMap[condition] || <WiCloud size={50} color="gray" />; // Default icon
      };

      setweatherdata({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: getWeatherIcon(data.weather[0].main),
      });
    } catch (error) {
      console.log(
        "Some Error Occured . Unable to fetch information. Try Again Later!!"
      );
    }
  };

  //  useEffect(()=>{
  //   search('mawsynram');

  //  },[])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className={styles.weather}>
      <div className={styles.searchbar}>
        <input
          className={styles.input}
          placeholder="Search..."
          type="text"
          ref={inpref}
          onKeyDown={handleKeyDown}
        />
        <FaSearch
          className={styles.sicon}
          onClick={() => search(inpref.current.value)}
        />
      </div>
      {/* <IoSunnySharp className={styles.weathericon} color="yellow"  size ={150}/> */}

      {weatherdata ? (
        <>
          {weatherdata.icon}
          <p className={styles.temperature}>{weatherdata.temperature}°c</p>
          <p className={styles.location}>{weatherdata.location}</p>

          <div className={styles.weatherinfo}>
            <div className={styles.col}>
              <WiHumidity size={50} />
              <div>
                <p>{weatherdata.humidity} %</p>
                <span className={styles.spn}>Humidity</span>
              </div>
            </div>

            <div className={styles.col}>
              <FaWind size={30} />
              <div>
                <p>{weatherdata.windspeed} km/h</p>
                <span className={styles.spn}>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Weather;
