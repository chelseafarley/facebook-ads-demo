import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Platform, View } from 'react-native';
import React from 'react';
import * as FacebookAds from 'expo-ads-facebook';

export default function App() {
  let [ isLoaded, setIsLoaded ] = React.useState(false);
  const bannerId = getPlacementId(true);
  const interstitialId = getPlacementId(false);

  FacebookAds.AdSettings.requestPermissionsAsync()
    .then(permissions => {
      let canTrack = permissions.status === "granted";
      FacebookAds.AdSettings.setAdvertiserTrackingEnabled(canTrack);
      setIsLoaded(true);
    })

  function getPlacementId(bannerAd) {
    let placementId;
    if (bannerAd) {
      placementId = Platform.OS === "ios" ? "979736269624954_979737056291542" : "979736269624954_979737399624841"
    } else {
      placementId = Platform.OS === "ios" ? "979736269624954_979737219624859" : "979736269624954_979737516291496"
    }

    if (__DEV__) {
      return `IMG_16_9_APP_INSTALL#${placementId}`;
    }

    return placementId;
  }

  function showInterstitial() {
    FacebookAds.InterstitialAdManager.showAd(interstitialId)
      .then(didClick => console.log(didClick))
      .catch(error => console.log(error));
  }

  function getBannerAd() {
    if (isLoaded) {
      return (
        <FacebookAds.BannerAd
          placementId={bannerId}
          type="large"
          onPress={() => console.log("click")}
          onError={error => console.log(error.nativeEvent)} />
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button title="Show Interstitial" onPress={showInterstitial} />
      </View>
      <View style={styles.adView}>
        {getBannerAd()}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  adView: {
    alignItems: 'flex-start',
    alignSelf: 'stretch'
  }
});
