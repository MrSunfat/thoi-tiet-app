import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import WTHourItem from '../components/WTHourItem';
import WTDayItem from '../components/WTDayItem';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGlobalContext } from '../context';

export default function Info({ navigation }) {
    const {
        weatherCityCurrent,
        weatherHourly,
        weatherDaily,
        roundTemp,
        dtToHour,
        dtToDayMonthDaily,
        roundTempAfterComma,
    } = useGlobalContext();

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(72,187,226,1)', 'rgba(73,147,249,1)']}
                style={styles.background}
            >
                <View style={styles.backHome}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Home')}
                        style={styles.backBtn}
                    >
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={24}
                            color="#fff"
                        />
                        <Text style={styles.titleBack}>Back</Text>
                    </TouchableOpacity>
                    <MaterialIcons name="settings" size={24} color="#fff" />
                </View>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.textMain}>Today</Text>
                        <Text style={styles.dateToday}>{`${dtToDayMonthDaily(
                            weatherCityCurrent.dt,
                            weatherCityCurrent.timezoneCity
                        )}`}</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.scrollViewH}
                    >
                        {weatherHourly.map(
                            (item, index) =>
                                index < 12 && (
                                    <WTHourItem
                                        key={index}
                                        temperature={roundTempAfterComma(
                                            item.temp
                                        )}
                                        hour={dtToHour(
                                            item.dt,
                                            weatherCityCurrent.timezoneCity
                                        )}
                                        img={item.weather[0].icon}
                                    />
                                )
                        )}
                    </ScrollView>
                </View>
                <View>
                    <View style={styles.title}>
                        <Text style={styles.textMain}>Next Forecast</Text>
                        <MaterialCommunityIcons
                            name="calendar-today"
                            size={24}
                            color="#fff"
                        />
                    </View>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={true}
                        style={styles.scrollViewV}
                    >
                        {weatherDaily.map((item, index) => (
                            <WTDayItem
                                key={index}
                                dateTime={dtToDayMonthDaily(
                                    item.dt,
                                    weatherCityCurrent.timezoneCity
                                )}
                                img={item.weather[0].icon}
                                temperature={roundTemp(item.temp.day)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingBottom: 310,
        // height: 300,
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    scrollViewH: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 12,
    },
    scrollViewV: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 12,
        paddingBottom: 100,
    },
    textMain: {
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 24,
        lineHeight: 30,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    dateToday: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    nextForecast: {},

    backHome: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 2,
    },
    backBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleBack: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
});
