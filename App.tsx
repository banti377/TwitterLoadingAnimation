import MaskedView from '@react-native-masked-view/masked-view';
import React, {useEffect, useState} from 'react';
import {Animated, StatusBar, StyleSheet, Text, View} from 'react-native';

const App = () => {
  const [loadingProgress] = useState(new Animated.Value(0));
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    Animated.timing(loadingProgress, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setAnimationDone(true);
    });
  }, [loadingProgress]);

  const opacityClearToVisible = {
    opacity: loadingProgress.interpolate({
      inputRange: [0, 15, 30],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    }),
  };

  const imageScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 10, 100],
          outputRange: [1, 0.8, 70],
        }),
      },
    ],
  };

  const appScale = {
    transform: [
      {
        scale: loadingProgress.interpolate({
          inputRange: [0, 100],
          outputRange: [1.1, 1],
        }),
      },
    ],
  };

  const fullScreenBlueLayer = animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, styles.loadingBackgroundStyle]} />
  );

  const fullScreenWhiteLayer = animationDone ? null : (
    <View style={[StyleSheet.absoluteFill, styles.fullScreenWhiteLayer]} />
  );
  return (
    <View style={styles.container}>
      <StatusBar animated={true} hidden={!animationDone} />
      {fullScreenBlueLayer}
      <MaskedView
        style={{flex: 1}}
        maskElement={
          <View style={styles.centeredFullScreen}>
            <Animated.Image
              source={require('./assets/twitter.png')}
              style={[styles.maskImageStyle, imageScale]}
            />
          </View>
        }>
        {fullScreenWhiteLayer}
        <Animated.View style={[opacityClearToVisible, appScale, {flex: 1}]}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>Our App here</Text>
          </View>
        </Animated.View>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenWhiteLayer: {
    backgroundColor: 'white',
  },
  maskImageStyle: {
    height: 100,
    width: 100,
  },
  loadingBackgroundStyle: {
    backgroundColor: 'rgba(15, 125, 255, 1)',
  },
});

export default App;
