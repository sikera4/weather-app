import React, {useState} from "react";
import { useApolloClient } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../gql/Queries';

function Home() {
  const [citySearched, setCitySearched] = useState<string>('');
  async function getWeather() {
    const { data, error } = await clientHook.query({
      query: GET_WEATHER_QUERY,
      variables: {name: citySearched},
    });
    if (error) return `Error!!! Here's the message: ${error.message}`
    setData(data);
  }
  const [data, setData] = useState({
    getCityByName:  {
      name: '',
      country: '',
      weather: {
        temperature: {
          actual: '',
          feelsLike: '',
        },
        summary: {
          description: '',
        }
      }
    }
  });
  const clientHook = useApolloClient();
  return (
    <div className="home">
      <h1 className="home__header">Find out about the weather in your city! Wow, much useful</h1>
      <form className="home__search">
        <input className="home__search-input" type="text" placeholder="City name..." onChange={(event) => 
          {setCitySearched(event.target.value);}}/>
        <button className="home__search-button" onClick={(event) => {
          event.preventDefault();
          getWeather();
        }}>Search</button>  
      </form>
      { (data.getCityByName && data.getCityByName.name) ?
        <div className="home__city-weather-info">
          <div className="home__city-name">You've searched for: <b>{data.getCityByName.name}</b></div>
          <div className="home__city-country">It's country is: <b>{data.getCityByName.country}</b></div>
          <div className="home__city-temperature">The actual temperature is: <b>{parseInt(data.getCityByName.weather.temperature.actual) / 10}</b></div>
          <div className="home__city-feelslike">While it feels like it's: <b>{parseInt(data.getCityByName.weather.temperature.feelsLike) / 10}</b></div>
          <div className="home__city-weather-description">Well, there is (are): <b>{data.getCityByName.weather.summary.description}</b></div>
        </div>
        : <div className="home__city-weather-info">There's nothing...</div>
      }
      
    </div>
  )
}

export default Home;