import {fetchWeatherData} from '../actions/FetchActions'
import {WEATHER_URL} from '../constants/constants'

const isWeatherResponseOk = (response) => response.base === 'stations' && response.cod === 200;

const extractWeatherData = response => ({
  weather: response.weather.pop(),
  cloudsPercentage: response.clouds.all,
  wind: response.wind,
  main: response.main
})

let go = true;

const fetchMiddleware = store => next => action => {
  const { id, promise } = action.payload;
  if (promise) {
    promise
      .then(rawResponse => rawResponse.json())
      .then(response => store.dispatch({
        type: action.type,
        payload: {
          id,
          weatherData: (isWeatherResponseOk(response)) ? extractWeatherData(response) : {}
        }
      }));
  }
  // const weatherData = store.getState().weatherData;
  // const markers = store.getState().markers;
  // if (weatherData && go) {
  //   go = false
  //   const unfetched = weatherData.filter(data => data.fetchNeeded).map(data => data.id);
  //   console.log(unfetched);
  //   const positions = markers.filter(marker => unfetched.indexOf(marker.id) !== -1).map(marker => ({
  //     id: marker.id,
  //     position: marker.position
  //   }));
  //
  //   positions.forEach(position => store.dispatch(fetchWeatherData(position.id, WEATHER_URL(position.lat, position.lng))));
  // }
  next(action);
}


export default fetchMiddleware;
