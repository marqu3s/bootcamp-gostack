import Reactotron from 'reactotron-react-native';

// Global React Native variable that is true when emulating a device.
if (__DEV__) {
  const tron = Reactotron
    // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

  // Enable using console.tron.log
  console.tron = tron;

  // Clear timeline on app refresh
  // tron.clear();
}
