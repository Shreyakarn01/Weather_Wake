import React, { useState} from 'react'
// import Loc from './Loc.png'
import Clouds from './Clouds.png'
import Sunrise from './Sunrise.png'
import Sunset from './Sunset.png'

export default function Mid() {

    const [coord,setCoord] = useState([]);
    const [name,setName] = useState([]);
    const [main, setMain] = useState([]);
    const [wind, setWind] = useState([]);
    const [sys, setSys] = useState([]);
    const [clouds, setClouds] = useState([]);
    const [weather, setWeather] = useState([]);
    // const [time, setTime] = useState(new Date());
    
    // useEffect(() => {
    //   setInterval(() =>{
    //     setTime(new Date())
    // }, 1000);
    // }, []);
    
    const update= async ()=>{
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=157e2123514d4fa0b333dc76eb0306eb&units=metric`;
        let data= await fetch(url);
        let parsedData= await data.json();
        console.log(parsedData);
        setCoord(parsedData.coord)
        setName(parsedData.name)
        setMain(parsedData.main)
        setWind(parsedData.wind)
        setSys(parsedData.sys)
        setClouds(parsedData.clouds)
        setWeather(parsedData.weather)
    }

    const handleClick=()=>{
        if(name !== ''){
           update();
        }
      }

  return (

    <div>
        <form className="d-flex" style={{marginTop:'60px'}} role="search">
                <input id="inp" className="form-control me-2 w-25" type="search" placeholder="Search" aria-label="Search" onChange={e=>setName(e.target.value)}/>
                <button type="button" class="btn btn-dark" onClick={handleClick}>Search</button>
            </form>
        <div>
            <div className="nm">{name}</div>
            {/* <img className="loc" src={Loc} alt={name}></img> */}
            <div className='imgdesc'>
            <span><img src={`https://openweathermap.org/img/wn/${weather.map(()=>{return weather[0].icon})}@2x.png`?`https://openweathermap.org/img/wn/${weather.map(()=>{return weather[0].icon})}@2x.png`:' '} alt='' style={{margin:'0px 35px'}}></img></span>
            <span className="de">{weather.map(()=>{return weather[0].description})}</span>
            </div>
            {/* <span style={{fontSize:'21px',display:'flex',justifyContent:'center',fontWeight:'700'}}>{time.toLocaleString()}</span> */}
      <span className="mid">{main.temp}°C<span className="fl">(Feels-like {main.feels_like})</span></span>
      </div>


<div class="d-flex justify-content-around desp">
         <div>
           <p className="writ"><u>Location & Pressure</u>
           <div className="text">
           <p>Latitude : {coord.lat} </p>
            <p>Longitude : {coord.lon}</p>
            <p>Sea-level pressure(hPa) : {main.sea_level?main.sea_level:"No Data Found"}</p>
            <p>Ground-level pressure(hPa) : {main.grnd_level?main.grnd_level:"No Data Found"}</p>
            </div>
           </p>
         </div>
         <div>
           <p className="new writ"><u>Min_Max</u>
           <div className="text">
           <p>temp_min : {main.temp_min}°C</p>
            <p>temp_max : {main.temp_max}°C</p>
            <p>humidity : {main.humidity}%</p>
            <p>pressure(hPa) : {main.pressure}</p>
           </div>
           </p>
         </div>
         <div>
          <p className='writ'><u>Wind</u>
          <div className="text">
          <p>Wind_speed(m/s) : {wind.speed}</p>
            <p>Wind_direction(°) : {wind.deg}</p>
            <p>Wind_Gust(m/s) : {wind.gust?wind.gust:"No Data Found"}</p>
          </div>
          </p>
         </div>

      </div>

      <div class="d-flex justify-content-evenly bel">
        <div className="info">
            <u>Cloudiness%</u>
            <img className="img" src={Clouds} alt="loading" width="50px"/>
            <p className="writ2">{clouds.all}%</p>
        </div>
        <div className="info" style={{borderRadius:'8px',backgroundColor:'rgb(255,255,255,0.2)'}}>
            <u>Sunrise</u>
            <img src={Sunrise} alt="loading" width="58px"/>
            <p className="writ2">{sys.sunrise} (unix,UTC)</p>
        </div>
        <div className="info" style={{borderRadius:'8px',backgroundColor:'rgb(255,255,255,0.2)'}}>
            <u>Sunset</u>
            <img src={Sunset} alt="loading" width="58px"/>
            <p className="writ2">{sys.sunset} (unix,UTC)</p>
        </div>

      </div>
    </div>
  )
}
