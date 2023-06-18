import React, { useEffect, useState } from 'react'
import "./style.css"
import Weathercard from './Weathercard.js'
const Temp = () => {

    const [searchValue,setSearchValue] = useState("pune")
    const [tempInfo,setTempInfo] = useState({})
    const getWeatherInfo = async ()=>{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a4d6aa356cb825b339f78a8d2cd2eb79`

            let res = await fetch(url);
            let data = await res.json();
            const {temp,humidity,pressure} = data.main;
            const {main : weatherMood} = data.weather[0]         // weather is array 
            const {name} = data
            const {speed} = data.wind         // line 15 to 19 written from api info 
            const {country,sunset} = data.sys;  // given imform of array or object and their combinations

            const myWeatherInfo = {
                temp,
                humidity,
                pressure,                       // all data store in one state
                weatherMood,
                name,
                speed,
                country,
                sunset,
            }    

            setTempInfo(myWeatherInfo);
        }
        catch(error){
            console.log(error)
        }
    };

    useEffect(()=>{getWeatherInfo();
    },[]);

  return (
    <>
    <div className='wrap'>
        <div className='search'>
            <input type='search'
            placeholder='search...'
            autoFocus
            id='search'
            className='searchTerm' value={searchValue} onChange={(event)=>setSearchValue(event.target.value)} >
            </input>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>


    {/* our temp card */}

        <Weathercard {...tempInfo}/>


    </>
    
  )
}

export default Temp;
