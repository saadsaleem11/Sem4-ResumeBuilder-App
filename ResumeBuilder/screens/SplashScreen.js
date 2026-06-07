import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, ActivityIndicator } from 'react-native';

const logoImage = require("./pictures/logo.jpg");

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Main'); // Navigate to 'Home' or your desired screen
    }, 3000); // Splash delay (increase if you want more time)

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      
      {/* App Icon */}
      <View style={styles.logoContainer}>
        <Image
          source={logoImage} // replace with your logo
          style={styles.logo}
        />
      </View>

      {/* App Title */}
      <Text style={styles.title}>ResumeCraft</Text>
      <Text style={styles.tagline}>Design. Preview. Launch Your Career.</Text>

      {/* Activity Indicator */}
      <ActivityIndicator size="large" color="blue" style={styles.activityIndicator} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  activityIndicator: {
    marginTop: 20,
  }
});
