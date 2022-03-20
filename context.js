import React, { useState, useContext, useCallback, useEffect } from 'react';

const AppContext = React.createContext();

function AppProvider({ children }) {
    // UTC +7
    const timeZone = 25200;

    const api = {
        key: '8db986fe08377dcec893f8940d9c2cfd',
        baseUrl: 'http://api.openweathermap.org/data/2.5/',
        svgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/04n.svg',
    };

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const ms2kmhWind = (wind) => {
        return Math.round(((wind * 3600) / 1000) * 10) / 10;
    };

    const roundTemp = (temp) => {
        return Math.round(temp);
    };

    const roundTempAfterComma = (temp) => {
        return Math.round(temp * 10) / 10;
    };

    const dtToDayMonth = (dt, timezoneCity) => {
        const time = new Date(
            new Date(dt * 1000) - (timeZone - timezoneCity) * 1000
        );

        return `${time.getDate()} ${monthNames[time.getMonth()]}`;
    };

    const dtToDayMonthDaily = (dt, timezoneCity) => {
        const time = new Date(
            new Date(dt * 1000) - (timeZone - timezoneCity) * 1000
        );

        return `${monthNames[time.getMonth()]}, ${time.getDate()}`;
    };

    const dtToHour = (dt, timezoneCity) => {
        const time = new Date(
            new Date(dt * 1000) - (timeZone - timezoneCity) * 1000
        );
        const hour =
            time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`;
        return `${hour}.00`;
    };

    const fetchDataHandlerr = useCallback(() => {
        setInput('');
        setHoverInput(false);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
        )
            .then((response) => response.json())
            .then((data) => {
                setWeatherCityCurrent({
                    nameCity: data?.name,
                    temperature: roundTemp(data?.temp),
                    description: data?.weather[0]?.description,
                    wind: ms2kmhWind(data?.wind?.speed),
                    hum: data?.main?.humidity,
                    imgWeather: data?.weather?.icon,
                    lon: data?.coord?.lon,
                    lat: data?.coord?.lat,
                    timezoneCity: data?.timezone,
                });
            })
            .catch((e) => console.dir(e));
    }, [api.key, input]);

    const [input, setInput] = useState('');
    const [hoverInput, setHoverInput] = useState(false);

    const [weatherCityCurrent, setWeatherCityCurrent] = useState({
        nameCity: 'Semarang',
        dt: 1647755907,
        temperature: 28,
        description: 'Cloud',
        wind: 10,
        hum: 56,
        imgWeather: 'http://openweathermap.org/img/wn/04d@4x.png',
        lon: 110.4203,
        lat: -6.9932,
        timezoneCity: 25200,
    });
    const [weatherHourly, setWeatherHourly] = useState([]);
    const [weatherDaily, setWeatherDaily] = useState([]);
    const [currentSearchCity, setCurrentSearchCity] = useState({});
    const [recentCities, setRecentCities] = useState([]);

    useEffect(() => {
        fetch(
            `http://api.openweathermap.org/data/2.5/onecall?lat=${weatherCityCurrent?.lat}&lon=${weatherCityCurrent?.lon}&units=metric&appid=${api.key}`
        )
            .then((response) => response.json())
            .then((data) => {
                setWeatherHourly(data?.hourly);
                setWeatherDaily(data?.daily);
                // console.log(dataHourly.length);
                // console.log(dataDaily.length);
                // console.log("hh");
            });
    }, [weatherCityCurrent]);

    const fetchDataHandler = useCallback(() => {
        setInput('');
        setHoverInput(false);
        console.log(input);
        fetch(
            `http://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setWeatherCityCurrent({
                    nameCity: data.name,
                    temperature: data.temp,
                    description: data.weather[0].description,
                    wind: ms2kmhWind(data.wind.speed),
                    hum: data.main.humidity,
                    imgWeather: data.weather.icon,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    timezoneCity: data.timezone,
                });
                setWeatherCityCurrent(data);
                console.log(weatherCityCurrent);
            })
            .catch((e) => console.dir(e));
    }, [api.key, input]);

    const backHome = () => {
        setHoverInput(false);
        navigation.navigate('Home');
    };

    const value = {
        api,
        input,
        hoverInput,
        weatherCityCurrent,
        weatherHourly,
        weatherDaily,
        currentSearchCity,
        setCurrentSearchCity,
        recentCities,
        setRecentCities,
        setInput,
        setHoverInput,
        setWeatherCityCurrent,
        setWeatherHourly,
        setWeatherDaily,

        ms2kmhWind,
        roundTemp,
        dtToDayMonth,
        dtToHour,
        dtToDayMonthDaily,
        roundTempAfterComma,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useGlobalContext() {
    return useContext(AppContext);
}

export { AppContext, AppProvider };
