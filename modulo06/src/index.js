import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

// import './config/ReactotronConfig';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native</Text>
    </View>
  );
}
