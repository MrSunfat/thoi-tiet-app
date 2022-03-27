import React, { useState, useContext, useCallback, useEffect } from 'react';
import db from './firebase';

const AppContext = React.createContext();

function AppProvider({ children }) {
    // UTC +7
    const timeZone = 25200;

    const api = {
        oldKey: '8db986fe08377dcec893f8940d9c2cfd',
        key: '5ebbd20056cc7dfdf9a3dd35b024c7f9',
        baseUrl: 'http://api.openweathermap.org/data/2.5/',
        svgUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/04n.svg',
    };

    const monthNamesEng = [
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

    const monthNames = [
        'Th 01',
        'Th 02',
        'Th 03',
        'Th 04',
        'Th 05',
        'Th 06',
        'Th 07',
        'Th 08',
        'Th 09',
        'Th 10',
        'Th 11',
        'Th 12',
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

        const dTime =
            time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

        return `${dTime} ${monthNames[time.getMonth()]}`;
    };

    const dtToDayMonthDaily = (dt, timezoneCity) => {
        const time = new Date(
            new Date(dt * 1000) - (timeZone - timezoneCity) * 1000
        );

        const dTime =
            time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

        return `${monthNames[time.getMonth()]}, ${dTime}`;
    };

    const dtToHour = (dt, timezoneCity) => {
        const time = new Date(
            new Date(dt * 1000) - (timeZone - timezoneCity) * 1000
        );
        const hour =
            time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`;
        return `${hour}.00`;
    };

    const [input, setInput] = useState('');
    const [hoverInput, setHoverInput] = useState(false);

    const [weatherCityCurrent, setWeatherCityCurrent] = useState({
        cod: 200,
        nameCity: 'Semarang',
        dt: 1647755907,
        temperature: 28,
        description: 'Mây',
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

    const [nameCityCurrent, setNameCityCurrent] = useState({});

    useEffect(() => {
        db.collection('weatherCurrent').onSnapshot((snapshot) => {
            // snapshot.docs.map((doc) => {
            //     console.log(doc);
            // });
            snapshot.docs.map((doc) => {
                setNameCityCurrent({ ...doc.data(), id: doc.id });
            });
        });
    }, []);

    useEffect(() => {
        const url = `${api.baseUrl}/weather?q=${nameCityCurrent?.nameCity}&units=metric&appid=${api.key}&lang=vi`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setWeatherCityCurrent({
                    cod: data.cod,
                    nameCity: data.cod === 200 ? data.name : '',
                    dt: data?.dt,
                    temperature: roundTemp(data?.main?.temp),
                    description:
                        data.cod === 200 ? data?.weather[0].description : '',
                    wind: ms2kmhWind(data?.wind?.speed),
                    hum: data?.main?.humidity,
                    imgWeather:
                        data.cod === 200
                            ? `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`
                            : '',
                    lon: data.cod === 200 ? data?.coord?.lon : 0,
                    lat: data.cod === 200 ? data?.coord?.lat : 0,
                    timezoneCity: data?.timezone,
                });
            });

        console.log('Hello H');
    }, [nameCityCurrent]);

    useEffect(() => {
        fetch(
            `${api.baseUrl}/onecall?lat=${weatherCityCurrent?.lat}&lon=${weatherCityCurrent?.lon}&units=metric&appid=${api.key}`
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

    

    // useEffect(() => {
    //     db.collection("recentCities").onSnapshot((snapshot) => {
    //         snapshot.docs.map((doc) => {
    //             console.log(doc.data());
    //         })
    //     })
    // }, [])

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
        nameCityCurrent, 
        setNameCityCurrent,

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
