import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/Header';
import CloudAndSun from '../assets/Svg/Weather/cloud-and-sun.svg';
import WeatherCurrent from '../components/WeatherCurrent';
import ArrowUpSVG from '../assets/Svg/Icon/up.svg';
import { useGlobalContext } from '../context';

export default function Home({ navigation }) {
    const { weatherCityCurrent } = useGlobalContext();
    const { nameCity, dt, temperature, description, wind, hum, imgWeather } =
        weatherCityCurrent;

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(72,187,226,1)', 'rgba(73,147,249,1)']}
                style={styles.background}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                >
                    <View style={styles.container}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Find')}
                            style={styles.findScreen}
                        >
                            <Header city={nameCity} />
                        </TouchableOpacity>
                        <View style={styles.weatherImg}>
                            <CloudAndSun width={169.38} height={172} />
                        </View>
                        <WeatherCurrent
                            dateTime={dt}
                            img={imgWeather}
                            temperature={temperature}
                            description={description}
                            wind={wind}
                            hum={hum}
                        />
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Back')}
                        >
                            <View style={styles.button}>
                                <Text style={styles.text}>Forecast report</Text>
                                <ArrowUpSVG width={24} height={24} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        alignItems: 'center',
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

    findScreen: {
        width: '100%',
    },
});
