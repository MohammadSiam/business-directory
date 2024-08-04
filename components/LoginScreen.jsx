import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (error) {
      console.error("OAuth error", error);
    }
  });

  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
          source={require("../assets/images/login.png")}
        />
      </View>
      <View
        style={{
          backgroundColor: "#fff",
        }}
      >
        <View style={{ backgroundColor: "#fff", padding: 20, marginTop: -20 }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "outfit-bold",
              textAlign: "center",
            }}
          >
            Your Ultimate
            <Text
              style={{
                color: Colors.PRIMARY,
              }}
            >
              {" "}
              Community Business Directory
            </Text>
            <Text> App</Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "outfit",
              textAlign: "center",
              marginVertical: 15,
              color: Colors.GRAY,
            }}
          >
            Find your favourite business near your and post your own business to
            your community
          </Text>
          <TouchableOpacity style={styles.btn} onPress={onPress}>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontFamily: "outfit",
              }}
            >
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;
