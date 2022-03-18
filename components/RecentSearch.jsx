import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function RecentSearch({ city, maxTemperature, minTemperature }) {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container}>
            <View style={styles.cityBox}>
                <AntDesign name="clockcircleo" size={19} color="#444E72" />
                <Text style={styles.cityName}>Surabaya</Text>
            </View>
            <Text>34°/21°</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
