import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../assets/Colors'


const Header = () => {
    return (

        <View style={styles.dashboard}>
            <Text style={styles.text}>DashBoard</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    dashboard: {
        height: 50,
        backgroundColor: Colors.purple,
        alignItems: "center",
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    text: {
        fontSize: 18,
        fontWeight: 500,
        color: Colors.white
    }
})

export default Header