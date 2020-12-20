import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {DisplayCountryName, DisplayCountryDetails, DisplayCityDetails} from './components/display'
import './index.css'

const Display = ( {data, showHandler } ) => {
//   console.log('display component reached!')
  if (data.length > 10 ) {
    return (<p>Please type a more specific query</p>)
  }
  else if (data.length > 1) {
    console.log('data', data)
    console.log('greater than 1 country reached!')
    // console.log('type of is: ', typeof display)

    return (  
      <div className = "main-container">
      {data.map(countryDetails => <DisplayCountryName countryName = {countryDetails.name} showHandler = {showHandler}/>)}
      </div>
      
      )}
      else if (data.length === 1) {
        return (
          <>
          {data.map(country => <DisplayCountryDetails country = {data[0]} key = {data[0].name} />)}
          </>

        )}

  else {
    return <p>Not Found</p>
  }
  }

const App = () => {
    const [info, setInfo] = useState( [] )
    const [countriesToShow, setCountriesToShow] = useState([]);

    // const [cityDetails, setCityDetails ] = useState ({});
    const [input, setInput] = useState('');


    const updateCountries = (searchQuery) => {
            setCountriesToShow(info.filter( (country ) =>  country.name.toLowerCase().startsWith(searchQuery.toLowerCase())))

    }


    const inputHandler = (event) => {
        updateCountries(event.target.value)
        // setCountriesToShow(info.filter( (country ) =>  country.name.toLowerCase().startsWith(event.target.value.toLowerCase())))
        setInput(event.target.value)
        // updateCountries()
        
        
    }
    const showCountryHandler = (countryName ) => {
        setInput(countryName)
        updateCountries(countryName)
    }

    const clearInput = () => {
      setInput('');
      updateCountries('')
    }

    useEffect( () => {
        axios.get('https://restcountries.eu/rest/v2/all').then(
        (response) => {
        console.log('reached useffect!!')
        
        setInfo(response.data)
        
        // setCountriesToShow(response.data.filter( (country) => country.name.toLowerCase().startsWith(input)))
        setCountriesToShow(response.data)
        
        }
    ) }, [])


    const display = <Display data = {countriesToShow} showHandler = {showCountryHandler} />

    return (
        <>
        <link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />
        <div className = "parent-container">
          <h1 className = "jumbotron">
            Countries
            <p className = "lead">Hi, this is a Web App that provides you with demographic information about different countries. It's build with 
            react and uses  API from restcountries.eu</p>
            
            </h1>
          <div className = "search-container">

            Search Countries <input value = {input} onChange = {inputHandler} className = "search" />

            <button className = "btn btn-primary clear-btn" onClick = {clearInput}>Clear Input</button>
          </div>

          {display }
          {countriesToShow.length === 1 ? <DisplayCityDetails cityName = {countriesToShow[0].capital} /> : ''}
        </div>
        </>
    )
    }

ReactDOM.render(<App />, document.getElementById('root'));