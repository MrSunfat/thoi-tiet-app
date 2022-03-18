import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WindySVG from '../assets/Svg/Icon/windy.svg';
import HumSVG from '../assets/Svg/Icon/hum.svg';

export default function WeatherCurrent({
    dateTime,
    img,
    temperature,
    description,
    wind,
    hum,
}) {
    return (
        <View style={styles.weatherCurrent} blurRadius={10}>
            <Text style={styles.dateTime}>{`Today, ${dateTime}`}</Text>
            <View style={styles.temperatureContainer}>
                <Text style={styles.temperature}>{temperature}</Text>
                <Text style={styles.degree}>°</Text>
            </View>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.info}>
                <View style={styles.infoWind}>
                    <View style={styles.flexCenter}>
                        <WindySVG width={20} height={20} />
                        <Text style={styles.textWind}>Wind</Text>
                    </View>
                    <Text style={styles.verticalSign}>|</Text>
                    <Text style={styles.infoText}>{`${wind} km/h`}</Text>
                </View>
                <View style={styles.infoHum}>
                    <View style={styles.flexCenter}>
                        <HumSVG width={20} height={20} />
                        <Text style={styles.textHum}>Hum</Text>
                    </View>
                    <Text style={styles.verticalSign}>|</Text>
                    <Text style={styles.infoText}>{`${hum} %`}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    weatherCurrent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 17,
        paddingBottom: 26,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        borderColor: '#C4DDED',
        borderWidth: 2,
        width: '100%',
    },
    dateTime: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        textTransform: 'capitalize',
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    temperatureContainer: {},
    temperature: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 100,
        lineHeight: 127,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -4, height: 8 },
        textShadowRadius: 30,
    },
    degree: {
        position: 'absolute',
        top: -12,
        right: -45,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 100,
        lineHeight: 127,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -4, height: 8 },
        textShadowRadius: 30,
    },

    description: {
        textTransform: 'capitalize',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 30,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },

    flexCenter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    info: {
        marginTop: 27,
    },
    infoWind: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoHum: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    textWind: {
        marginLeft: 22,
        marginRight: 23,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    textHum: {
        marginLeft: 22,
        marginRight: 28,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    verticalSign: {
        paddingRight: 20,
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
