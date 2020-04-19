//DOM manipulation and event handling

const cityForm = document.querySelector('form'); //beause we have only one form anyway
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails: cityDetails,
        weather: weather
    };
};

const updateUI = data => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
};

cityForm.addEventListener('submit', e => {
    //prevent default action so it doesn't refresh the page
    e.preventDefault();
    //get city value
    const city = cityForm.city.value.trim();
    //clear form field
    cityForm.reset();

    //update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});