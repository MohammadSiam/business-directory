import React from "react";
import { StyleSheet, Text, View } from "react-native";

const About = ({ business }) => {
  return (
    <View style={{ padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>About</Text>
      <Text style={{ fontFamily: "outfit", lineHeight: 25 }}>
        {business.about}
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
