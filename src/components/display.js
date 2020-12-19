import React, {useState, useEffect} from 'react';
import utils from '../utils/utils.js';
export const DisplayCountryName = ({countryName, showHandler}) => {
    const style = {
        color: "blue"
    }

    console.log('display country name function reached!')
    return (
        <div className = "countryname" style= {style}>
        <p>{countryName}
        <button onClick = {()=> showHandler(countryName)}>Show</button></p>
        </div>
    )
}




export const DisplayCountryDetails = ({country}) => {
    return (
    <>
        <h1>{country.name}</h1>
        <p>Capital {country.capital}</p>
        <p>Population {country.population}</p>  
        <h2>languages</h2>
        {country.languages.map( (language) => <li key = {language.name}>{language.name}</li> )}
        <img src= {country.flag} height = "200px" width = "200px" alt = {country.name + " flag"}  />          
    </>)
}


export const DisplayCityDetails = (props ) => {
    console.log('props: ', props)
    const [cityDetails, setCityDetails ] = useState({})
    useEffect(() => {
        
        utils.getWeatherPromise(props.cityName).then( data => {
            console.log('data received from weather request is: ', data)
            const temp = data.current.temperature
            const imgurl = data.current.weather_icons[0]
            const windSpeed =data.current.wind_speed
            const windDirection = data.current.wind_dir
            setCityDetails({temp, imgurl, windSpeed, windDirection})
        })
    }, [])
    console.log('city details: ', cityDetails)
    return (
        <>
        <h1>Weather in {props.cityName}</h1>
        <p><strong>temprature:</strong> {cityDetails.temp} Celcius</p>
        <img src = {cityDetails.imgurl} alt = {cityDetails.cityName} />
        <p>wind: {cityDetails.windSpeed} direction {cityDetails.windDirection} </p>
        </>
    )
}