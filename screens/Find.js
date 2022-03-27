import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import RecentSearch from '../components/RecentSearch';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useGlobalContext } from '../context';
import db from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function Find({ navigation }) {
    // const [city, setCity] = useState('');
    const {
        api,
        input,
        setInput,
        hoverInput,
        setHoverInput,
        weatherCityCurrent,
        setWeatherCityCurrent,
        recentCities,
        setRecentCities,
        ms2kmhWind,
        roundTemp,
        nameCityCurrent,
    } = useGlobalContext();

    const backHome = () => {
        setHoverInput(false);
        navigation.navigate('Home');
    };

    // Xử lý khi search
    const fetchDataHandle = async () => {
        if (input.length > 0) {
            backHome();
            console.log(input);

            const url = `${api.baseUrl}/weather?q=${input}&units=metric&appid=${api.key}&lang=vi`;
            const res = await fetch(url);
            const data = await res.json();

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

            if (data.cod === 200) {
                let arrRecentCities = [...recentCities];

                if (arrRecentCities.length >= 3) {
                    db.collection('recentCities')
                        .doc(arrRecentCities[2].id)
                        .delete();
                }

                db.collection('recentCities').add({
                    nameCity: data.name,
                    minTemp: roundTemp(data.main.temp_min),
                    maxTemp: roundTemp(data.main.temp_max),
                    createAt: firebase.firestore.FieldValue.serverTimestamp(),
                });

                updateNameCityCurrent(data.name);
            }
        } else {
            ToastAndroid.showWithGravity(
                'Vui lòng nhập tên thành phố!!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
    };

    // Xử lý khi chọn city
    const fetchDataHandleClick = async (city) => {
        setInput('');
        backHome();

        const url = `${api.baseUrl}/weather?q=${city}&units=metric&appid=${api.key}&lang=vi`;
        // const res = await fetch(url);
        // const data = await res.json();

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setWeatherCityCurrent({
                    cod: data.cod,
                    nameCity: data.name,
                    dt: data.dt,
                    temperature: roundTemp(data.main.temp),
                    description: data.weather[0].description,
                    wind: ms2kmhWind(data.wind.speed),
                    hum: data.main.humidity,
                    imgWeather: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    timezoneCity: data.timezone,
                });

                updateNameCityCurrent(data.name);
            })
            .catch(() => {
                console.log('Error!!');
            });
    };

    const updateNameCityCurrent = (city) => {
        db.collection('weatherCurrent').doc(nameCityCurrent.id).update({
            nameCity: city,
        });
    };

    useEffect(() => {
        db.collection('recentCities')
            .orderBy('createAt', 'desc')
            .onSnapshot((snapshot) => {
                setRecentCities(
                    snapshot.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id };
                    })
                );
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerSearch}>
                <View style={styles.inputBox}>
                    <TouchableOpacity activeOpacity={0.9} onPress={backHome}>
                        <AntDesign name="arrowleft" size={24} color="#444E72" />
                    </TouchableOpacity>
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        onFocus={() => setHoverInput(true)}
                        onSubmitEditing={fetchDataHandle}
                        placeholder="Nhập tên thành phố"
                        style={styles.textInput}
                    />
                </View>
                {hoverInput && recentCities.length > 0 && (
                    <View style={styles.containerRecent}>
                        <Text style={styles.titleRecent}>Gần đây</Text>
                        {recentCities.map((recentCity, index) => (
                            <RecentSearch
                                key={index}
                                city={recentCity.nameCity}
                                minTemperature={recentCity.minTemp}
                                maxTemperature={recentCity.maxTemp}
                                handleFunc={() => {
                                    fetchDataHandleClick(recentCity.nameCity);
                                    console.log(recentCity.nameCity);
                                }}
                            />
                        ))}
                    </View>
                )}
            </View>

            <View style={styles.containerMap}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    region={{
                        latitude: weatherCityCurrent.lat,
                        longitude: weatherCityCurrent.lon,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 35,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
    },
    containerSearch: {
        // flex: 0.5,
        paddingHorizontal: 20,
        paddingBottom: 16,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    inputBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 14,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 2,
    },
    textInput: {
        flex: 1,
        marginLeft: 12,
        color: '#838BAA',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 21,
    },
    containerRecent: {
        marginTop: 20,
    },
    titleRecent: {
        color: '#444E72',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 13,
        lineHeight: 16,
        marginBottom: 15,
    },
    containerMap: {
        flex: 1,
        // ...StyleSheet.absoluteFillObject,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
