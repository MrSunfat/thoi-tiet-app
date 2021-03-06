import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    LogBox,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import WeatherCurrent from '../components/WeatherCurrent';
import ArrowUpSVG from '../assets/Svg/Icon/up.svg';
import { useGlobalContext } from '../context';
import db from '../firebase';

export default function Home({ navigation }) {
    LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);

    const {
        input,
        setInput,
        weatherCityCurrent,
        dtToDayMonth,
        setNameCityCurrent,
        nameCityCurrent,
    } = useGlobalContext();
    const [loading, setLoading] = useState(false);

    const {
        cod,
        nameCity,
        dt,
        temperature,
        description,
        wind,
        hum,
        imgWeather,
        timezoneCity,
    } = weatherCityCurrent;

    useEffect(() => {
        db.collection('weatherCurrent').onSnapshot((snapshot) => {
            // snapshot.docs.map((doc) => {
            //     console.log(doc);
            // });
            snapshot.docs.map((doc) => {
                setNameCityCurrent({ ...doc.data(), id: doc.id });
            });
        });
        setLoading(true);
    }, []);

    const goFind = () => {
        setInput('');
        navigation.navigate('Find');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(72,187,226,1)', 'rgba(73,147,249,1)']}
                style={styles.background}
            >
                {!loading && (
                    <View style={{ marginBottom: 20 }}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                )}

                {loading && (
                    <>
                        <Header
                            city={cod === 200 ? nameCity : input}
                            onHandle={goFind}
                        />
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={styles.scrollView}
                        >
                            {cod === '404' && (
                                <Text
                                    style={styles.noCity}
                                >{`Kh??ng t??m th???y th??ng tin v??? th??nh ph??? ${input} !!`}</Text>
                            )}

                            {cod === 200 && (
                                <View style={styles.container}>
                                    <Image
                                        style={styles.weatherImg}
                                        source={{
                                            uri: imgWeather,
                                        }}
                                    />
                                    <WeatherCurrent
                                        dateTime={dtToDayMonth(
                                            dt,
                                            timezoneCity
                                        )}
                                        temperature={temperature}
                                        description={description}
                                        wind={wind}
                                        hum={hum}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            navigation.navigate('Back')
                                        }
                                    >
                                        <View style={styles.button}>
                                            <Text style={styles.text}>
                                                D??? b??o chi ti???t
                                            </Text>
                                            <ArrowUpSVG
                                                width={24}
                                                height={24}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </ScrollView>
                    </>
                )}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // backgroundColor: 'orange',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        paddingTop: 35,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        // height: 300,
    },
    scrollView: {
        width: '100%',
    },
    weatherImg: {
        width: 180,
        height: 120,
        // borderRadius: 20,
        marginVertical: 20,
        // backgroundColor: '#E5E3C9',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        backgroundColor: '#fff',
        width: 222,
        marginTop: 12,
        marginBottom: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    text: {
        color: '#444E72',
        marginRight: 16,
    },
    noCity: {
        marginTop: 50,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 50,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 5,
    },
});
