import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useGlobalContext } from '../context';

export default function RecentSearch({ city, maxTemperature, minTemperature, handleFunc }) {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={handleFunc}>
            <View style={styles.cityBox}>
                <AntDesign name="clockcircleo" size={19} color="#444E72" />
                <Text style={styles.cityName}>{city}</Text>
            </View>
            <Text>{`${maxTemperature}°/${minTemperature}°`}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textTransform: 'capitalize',
        paddingLeft: 2,
        marginVertical: 10,
    },
    cityBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cityName: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 17,
        lineHeight: 25,
        color: '#444E72',
        marginLeft: 16,
    },
});
