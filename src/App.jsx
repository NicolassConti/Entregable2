
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
 

function App() {
  const [weather, setWeather] = useState({})
  const [isfha, setIsfha]= useState(true)
  
  useEffect(() =>{
  
    function success(pos) {
      const crd = pos.coords;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=798024229d47ae502be06fb5b96959da`).then(res => setWeather(res.data))
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
    }
  
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    } 

    navigator.geolocation.getCurrentPosition(success, error);
  
  },[])
  
  console.log (weather) 
  const Change = () =>{
    setIsfha(!isfha)

  }
  
  const Fha = (weather.main?.temp - 273.15) * 9/5 +(32)
  const Cel = ((weather.main?.temp - 273.15) * 9/5 +(32) - 32) * 5/9
  

  return (
    <div className="App">
      <div>
        <video muted autoPlay loop>
          <source src='./public/fondo.mp4' type='video/mp4'/>
        </video>
      </div>
      <div className='card'>
        <h1 className='h1'>Weather App</h1>
            <img className='icon'  src="http://openweathermap.org/img/wn/01n.png" alt="" />
            <p>{weather.name}, {weather.sys?.country}</p>
            <p>{isfha ? Fha : Cel } {" "}
            {isfha ? 'Fha' : 'Cel'} </p> 
            <p>"{weather.weather?.[0]?.description}"</p>
            <p> Wind Speed: {weather.wind?.speed} m/s</p>
            <p> Clouds: {weather.clouds?.all} %</p> 
            <p> Pressure: {weather.main?.pressure * 0.01} mb</p> 
          <br />
     <button className='boton' onClick={Change}>Degree °F/°C</button>
      </div>  
    </div>
  )
} 

export default App