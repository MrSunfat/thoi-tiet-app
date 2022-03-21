import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import LocationSVG from '../assets/Svg/Icon/location.svg';
import BellSVG from '../assets/Svg/Icon/bell.svg';
import ArrowDownSVG from '../assets/Svg/Icon/arrow-down.svg';

export default function Header({ city, onHandle }) {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onHandle}
                style={styles.headerCity}
            >
                <LocationSVG width={18} height={22} />
                <Text style={styles.nameCity}>{city}</Text>
                <ArrowDownSVG width={8.5} height={6} />
            </TouchableOpacity>

            <View style={styles.headerBell}>
                <BellSVG width={18} height={21.5} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        width: '100%',
    },
    headerCity: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    nameCity: {
        marginLeft: 23,
        marginRight: 25,
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
    headerBell: {
        // flex: 2,
    },
});
