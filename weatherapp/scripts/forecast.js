//AcuWeather API key
const key = 'EW9qJ3OXd5SgwnPaW3i5w1pKGenmDAlu';

//get city info
const getCity = async (city) => {
    //base url of the API that we want to make a request to
    const baseURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    //awaiting promise until it's resolved
    const response = await fetch(baseURL + query);
    const data = await response.json();

    return data[0];
};

//get weather info
const getWeather = async (id) => {
    const baseURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const response = await fetch(baseURL + query);
    const data = await response.json();

    return data[0];
};

