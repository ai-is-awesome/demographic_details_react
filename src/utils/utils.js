import Axios from "axios"

const getUrl = (cityName) => {
    const urlFriendly = encodeURIComponent(cityName)
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${urlFriendly}`
    return url
}


const getWeatherPromise = async (cityName) => {
    const url = getUrl(cityName)
    console.log('url in getcitydetails is:', url)
    // Axios.get(url).then(
    //     (res) => {
    //     console.log('data in call back is: ', res)
    //     cityData = res.data
    //     return cityData
    //     }).catch(err => console.log(err))
    
    const resp = await Axios.get(url)
    return resp.data
    
}


const getDemographicData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all';
    const resp  =await Axios.get(url)
    return resp.data
}

export default {getUrl, getWeatherPromise}
