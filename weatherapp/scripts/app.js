//DOM manipulation and event handling

const cityForm = document.querySelector('form'); //beause we have only one form anyway
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

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

    console.log(weather);

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    //update night, day, icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;
    if(weather.IsDayTime) {
        timeSrc = 'img/day.jpg';
    } else {
        timeSrc = 'img/night.jpg';
    }
    time.setAttribute('src', timeSrc);

    //remove d-none class if present
    if(card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
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