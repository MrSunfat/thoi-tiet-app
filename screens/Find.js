import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    LogBox,
    Platform,
} from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import RecentSearch from '../components/RecentSearch';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useGlobalContext } from '../context';
import db from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

export default function Find({ navigation }) {
    LogBox.ignoreLogs(['Setting a timer']);

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

    // lay dia chi cua dt
    const getMyLocation = async () => {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const url = `${api.baseUrl}/weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&units=metric&appid=${api.key}&lang=vi`;
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
    }

    const backHome = () => {
        setHoverInput(false);
        navigation.navigate('Home');
    };

    // X??? l?? khi search
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
                'Vui l??ng nh???p t??n th??nh ph???!!',
                ToastAndroid.SHORT,
                ToastAndroid.TOP
            );
        }
    };

    // X??? l?? khi ch???n city
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
                    snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
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
                        placeholder="Nh???p t??n th??nh ph???"
                        style={styles.textInput}
                    />
                </View>
                {hoverInput && recentCities.length > 0 && (
                    <View style={styles.containerRecent}>
                        <Text style={styles.titleRecent}>G???n ????y</Text>
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
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.1,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: weatherCityCurrent.lat,
                            longitude: weatherCityCurrent.lon,
                        }}
                        pinColor={'#F74F57'}
                        title={'title'}
                        description={'description'}
                    />
                </MapView>

                <TouchableOpacity style={styles.myLocation} activeOpacity={0.75} onPress={getMyLocation}>
                    <MaterialIcons name="my-location" size={24} color="black" />
                </TouchableOpacity>
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
    myLocation: {
        position: 'absolute',
        maxWidth: 45,
        right: 16,
        bottom: 40,
        padding: 10,
        borderRadius: 22,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});
