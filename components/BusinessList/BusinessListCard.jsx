import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

const BusinessListCard = ({ business }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        gap: 5,
      }}
      onPress={() => router.push("/businessdetail/" + business.id)}
    >
      <Image
        style={{ width: 120, height: 120, borderRadius: 15 }}
        source={{ uri: business.imageUrl }}
      />
      <View style={{ flex: 1, gap: 7 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {business.name}
        </Text>
        <Text
          style={{ fontFamily: "outfit", color: Colors.GRAY, fontSize: 15 }}
        >
          {business.address}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Image
            style={{ width: 15, height: 15 }}
            source={require("../../assets/images/star.png")}
          />
          <Text style={{ fontFamily: "outfit" }}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListCard;

const styles = StyleSheet.create({});
