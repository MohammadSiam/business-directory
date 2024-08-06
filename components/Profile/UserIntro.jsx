import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const UserIntro = () => {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 99 }}
        source={{ uri: user.imageUrl }}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
        Welcome, {user.fullName}
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}>
        {user.primaryEmailAddress.emailAddress}
      </Text>
    </View>
  );
};

export default UserIntro;

const styles = StyleSheet.create({});
