import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function WTHourItem({ temperature, hour, img }) {
    return (
        <View style={styles.container}>
            <Text style={styles.temperature}>{`${temperature}°C`}</Text>
            {/* <CloudAndSun width={50} height={44} /> */}
            <Image
                style={styles.weatherImg}
                source={{
                    uri: `http://openweathermap.org/img/wn/${img}@4x.png`,
                }}
            />
            <Text style={styles.hour}>{`${hour}`}</Text>
        </View>
    );
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
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    hour: {
        marginTop: 8,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFF',
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: -2, height: 3 },
        textShadowRadius: 1,
    },
    weatherImg: {
        width: 50,
        height: 50,
    },
});
