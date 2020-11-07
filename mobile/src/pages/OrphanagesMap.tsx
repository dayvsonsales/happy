import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, Alert } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import * as Location from "expo-location";

import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";

import mapMarkerImg from "../images/map-marker.png";
import { LocationObject } from "expo-location";

export default function OrphanagesMap() {
  const [region, setRegion] = useState<Region>({
    latitude: -27.2092052,
    longitude: -123.6401092,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });

  const navigation = useNavigation();

  function handleNavigateToCreateOrphanage() {
    navigation.navigate("SelectMapPosition");
  }

  function handleNavigateToOrphanageDetails() {
    navigation.navigate("OrphanageDetails");
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
      }

      let location: LocationObject = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={region}
        style={styles.mapStyle}
      >
        <Marker
          icon={mapMarkerImg}
          calloutAnchor={{ x: 2.7, y: 0.8 }}
          coordinate={{
            latitude: -27.2092052,
            longitude: -49.6401092,
          }}
        >
          <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>
        <RectButton
          style={styles.createOrphanage}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 16,
    justifyContent: "center",
    elevation: 3,
  },

  calloutText: {
    color: "#0089A5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },

  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 3,
  },

  footerText: {
    fontFamily: "Nunito_700Bold",
    color: "#8fa7b3",
  },

  createOrphanage: {
    width: 56,
    height: 56,
    backgroundColor: "#15C3D6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
