import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CloudAndSun from '../assets/Svg/Weather/cloud-and-sun.svg';

export default function WTDayItem({ dateTime, img, temperature }) {
    return (
        <View style={styles.container}>
            <Text style={styles.dateTime}>Sep, 13</Text>
            <CloudAndSun width={50} height={44} />
            <Text style={styles.temperature}>21°</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 4,
        marginHorizontal: 2,
    },
    dateTime: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    temperature: {
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
