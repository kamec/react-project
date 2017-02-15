

const extractWeatherData = response => ({
    weather: response.weather.pop(),
    cloudsPercentage: response.clouds.all,
    wind: response.wind,
    main: response.main
})


const fetchMiddleware = store => next => action => {
  const {marker, promise} = action.payload;
  if (promise) {
    promise
      .then(rawResponse => rawResponse.json())
      .then(response => store.dispatch({
        type: action.type,
        payload: {
          marker,
          weatherData: (response.base === 'stations' && response.cod === 200) ? extractWeatherData(response) : {}
          // weatherData: response
        }
      }));
  } else {
    next(action);
  }
}


export default fetchMiddleware;
