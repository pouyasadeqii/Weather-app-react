import React,{useState,useEffect} from 'react';
import axios from 'axios';

// style
import styles from "./app.module.css"
const api ={
  key: "2e7bd66312f7d1abe77f1c287d6363fb",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `${api.base}weather?q=${location}&appid=${api.key}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter" && location) {
      axios.get(url)
      .then((res) => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch((res) => {
        setData(res.response.data);
        // console.log(res);
      })
      setLocation('')
    }
  }
  useEffect(() => {
    document.getElementById("input").focus()
  },[])


  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <input 
        type="text"
        id='input' 
        value={location} 
        placeholder="Enter location"
        onChange={event => setLocation(event.target.value)} 
        onKeyPress={searchLocation}
        />
      </div>

      {data.cod === "404" ? 
        <p className={styles.error}>{data.message}</p>
        :

        <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.location}>
            {data.sys && <p className={styles.detailes}>{data.name} {data.sys.country}</p>}
            
          </div>
          <div className={styles.temp}>
            { data.main && <h1 className={styles.heading}>{data.main.temp.toFixed()} °C</h1>}
            
          </div>
          <div className={styles.description}>
            {data.weather && <p className={styles.detailes}>{data.weather[0].main}</p>}
            
          </div>
        </div>

        {data.main && 
        <div className={styles.bottom}>
          <div className={styles.feels}>
            {data.main && <p className={`${styles.detailes} ${styles.bold}`}>{data.main.feels_like.toFixed()} °C</p>}
            
            <p className={styles.detailes}>Feels Like</p>
          </div>
          <div className={styles.humidity}>
          {data.main && <p className={`${styles.detailes} ${styles.bold}`}>{data.main.humidity}%</p>}
            <p className={styles.detailes}>Humidity</p>
          </div>
          <div className={styles.wind}>
            {data.wind && <p className={`${styles.detailes} ${styles.bold}`}>{data.wind.speed.toFixed()} MPH</p>}
            <p className={styles.detailes}>Wind Speed</p>
          </div>
        </div>
        }


      </div>

      }


     
    </div>
  );
};

export default App;