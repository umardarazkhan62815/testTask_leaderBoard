import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
const App = () => {
  return (
    <View style={Styles.container}>
     <HomeScreen/>
    </View>
  )
}

const Styles = StyleSheet.create({
  container:{
    flex:1
  }
})

export default App