import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import CloudAndSun from '../assets/Svg/Weather/cloud-and-sun.svg';

export default function WTHourItem({ temperature, hour, img }) {
  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>29°C</Text>
      <CloudAndSun width={50} height={44} />
      <Text style={styles.hour}>15.00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingVertical: 13,
        paddingHorizontal: 12,
        marginHorizontal: 2,
        borderRadius: 20,
        borderColor: '#C4DDED',
        borderWidth: 0.8,
    },  
    temperature: {
        marginBottom: 8,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: "#FFF",
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: -2, height: 3},
        textShadowRadius: 1,
    },
    hour: {
        marginTop: 8,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: "#FFF",
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: {width: -2, height: 3},
        textShadowRadius: 1,
    },
})